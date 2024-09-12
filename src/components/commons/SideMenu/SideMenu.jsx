'use client';

import { useEffect, useState } from 'react';
import { func, string } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import cx from 'classnames';

import { clearStorage, removeQuestion } from '@/redux/store/slicer/unsavedQuestionsSlicer';

import QuestionMenuItem from '../QuestionMenuItem';
import Button from '../Button';

import s from './SideMenu.module.scss';

export default function SideMenu({ id, openConfirmation, handleUpdate }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [unsavedQuestions, setUnsavedQuestions] = useState(null);

  const test = useSelector((store) => store.test);
  const allUnsavedQuestions = useSelector((store) => store.newQuestions); // получаем список ВСЕХ несохраненных вопросов ко ВСЕМ тестам

  const currentTestNewData = allUnsavedQuestions.find((i) => id in i); // получаем объект со свойством (id) и значением - массивом несохраненных вопросов к ТЕКУЩЕМУ тесту, если этот список существует

  const clearConfirmation = () => {
    dispatch(clearStorage(id));
  };

  useEffect(() => {
    if (router.isReady && currentTestNewData) {
      const newDataList = currentTestNewData[id]; // получаем список несохраненных вопросов к ТЕКУЩЕМУ тесту
      setUnsavedQuestions(newDataList); // и записываем в стейт
    }
  }, [currentTestNewData]);

  const { questions } = test;

  useEffect(() => {
    if (id) {
      dispatch({ type: 'test/fetchTest', id });
    }
  }, [dispatch, id]);

  const questionList = (arr, saved = false) => arr?.map((item, i) => { // в аргументах помимо массива лежит булиевое значение saved, в случае true вопросы можно редактировать
    const handleDelete = () => {
      if (saved) {
        openConfirmation(item.id, true);
      }

      dispatch(removeQuestion({ questionId: item.id, testId: id }));
    };

    const updating = () => {
      handleUpdate(item.question_type, item.id);
    };

    return <QuestionMenuItem key={item.id} id={item.id} title={item.title} href={`/test/${id}/edit/${item.id}?type=${item.question_type}`} openConfirmation={openConfirmation} sequenceNumber={i + 1} handleDelete={handleDelete} handleUpdate={updating} saved={saved} />;
  });

  return (
    <div className={s.root}>
      <div className={cx(s.createdQuestionsContainer, { [s.onlySavedQuestions]: currentTestNewData })}>
        <h2 className={s.header}>Test Questions</h2>
        <div className={s.content}>
          {questionList(questions, true)}
        </div>
      </div>
      <div className={cx(s.unsavedQuestionsContainer, { [s.noNewQuestions]: !currentTestNewData })}>
        <h2 className={s.header}>New Questions</h2>
        <div className={s.content}>
          {questionList(unsavedQuestions)}
        </div>
        <div className={s.savingButtonsContainer}>
          <Button className={s.saveBtn} type="button">Save</Button>
          <Button className={s.clearBtn} type="button" onClick={clearConfirmation}>Clear</Button>
        </div>
      </div>
    </div>
  );
}

SideMenu.propTypes = {
  id: string,
  openConfirmation: func,
  handleUpdate: func,
};
