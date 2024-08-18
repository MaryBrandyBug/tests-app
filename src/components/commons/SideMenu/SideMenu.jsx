'use client';

import { useEffect, useState } from 'react';
import { func, string } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import cx from 'classnames';

import { getTest } from '@/redux/store/slicer/testSlicer';
import { clearStorage, removeQuestion } from '@/redux/store/slicer/unsavedQuestionsSlicer';

import QuestionMenuItem from '../QuestionMenuItem';
import Button from '../Button';

import s from './SideMenu.module.scss';

export default function SideMenu({ id, openConfirmation }) {
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
      fetch(`https://interns-test-fe.snp.agency/api/v1/tests/${Number(id)}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
        },
      })
        .then((res) => res.json())
        .then((data) => dispatch(getTest(data)));
    }
  }, [id]);

  const questionList = (arr, numeration = false) => arr?.map((item, i) => { // в аргументах помимо массива лежит булиевое значение numeration, принимающее значение true в том случае, если к списку нам нужна нумерация элементов
    const handleDelete = () => {
      if (numeration) {
        openConfirmation(item.id, true);
      }

      dispatch(removeQuestion({ questionId: item.id, testId: id }));
    };

    return <QuestionMenuItem key={item.id} id={item.id} title={item.title} openConfirmation={openConfirmation} sequenceNumber={i + 1} handleDelete={handleDelete} numeration={numeration} />;
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
          <Button className={s.saveBtn}>Save</Button>
          <Button className={s.clearBtn} type="button" onClick={clearConfirmation}>Clear</Button>
        </div>
      </div>
    </div>
  );
}

SideMenu.propTypes = {
  id: string,
  openConfirmation: func,
};
