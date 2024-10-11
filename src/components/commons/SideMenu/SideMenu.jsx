'use client';

import { useEffect, useState } from 'react';
import { func, string } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import cx from 'classnames';

import { clearStorage, removeQuestion } from '@/redux/store/slicer/unsavedQuestionsSlicer';
import { addQuestion } from '@/redux/store/slicer/testSlicer';

import QuestionMenuItem from '../QuestionMenuItem';
import Button from '../Button';
import Confirmation from '../Confirmation';

import s from './SideMenu.module.scss';

export default function SideMenu({ id, openConfirmation, handleUpdate }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [openSaveConfirmation, setOpenSaveConfirmation] = useState(false);
  const [unsavedQuestions, setUnsavedQuestions] = useState(null);

  const test = useSelector((store) => store.test);
  const allUnsavedQuestions = useSelector((store) => store.newQuestions); // получаем список ВСЕХ несохраненных вопросов ко ВСЕМ тестам

  const clearUnsaved = () => {
    dispatch(clearStorage());
  };
  const saveConfirmation = () => {
    setOpenSaveConfirmation(true);
  };
  const closeModal = () => {
    setOpenSaveConfirmation(false);
  };

  const onSubmit = () => {
    const values = unsavedQuestions.map(({ id: _, ...rest }) => rest);

    values.forEach((item) => {
      const dataToSend = { // отделяем данные которые пойдут в таблицу questions, ответы на вопросы с несколькими вариантами ответа
        title: item.title, // добавятся после записи самого вопроса в questions
        question_type: item.question_type,
        answer: item.answer || null,
      };

      fetch(`https://interns-test-fe.snp.agency/api/v1/tests/${Number(id)}/questions`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
        },
        body: JSON.stringify(dataToSend),
      })
        .then((res) => res.json())
        .then((question) => {
          dispatch(addQuestion(question));
          item.answers?.forEach((answer) => { // проходимся по списку вопросов и отправляем в бд каждый по отдельности в отдельную таблицу с ответами
            fetch(`https://interns-test-fe.snp.agency/api/v1/questions/${question.id}/answers`, {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
                'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
              },
              body: JSON.stringify(answer),
            })
              .then((res) => res.json());
          });
        });
    });

    dispatch(clearStorage());
    closeModal();
  };

  useEffect(() => {
    if (router.isReady && allUnsavedQuestions) { // получаем список несохраненных вопросов к ТЕКУЩЕМУ тесту
      setUnsavedQuestions(allUnsavedQuestions); // и записываем в стейт
    }
  }, [router, allUnsavedQuestions]);

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

      dispatch(removeQuestion({ questionId: item.id }));
    };

    const updating = () => {
      handleUpdate(item.question_type, item.id);
    };

    return <QuestionMenuItem key={item.id} id={item.id} title={item.title} href={`/editing/${id}/edit/${item.id}?type=${item.question_type}`} openConfirmation={openConfirmation} sequenceNumber={i + 1} handleDelete={handleDelete} handleUpdate={updating} saved={saved} />;
  });

  return (
    <div className={s.root}>
      { openSaveConfirmation && (
        <Confirmation header="Do you want to save your question?" closeConfirmation={closeModal} onClick={onSubmit} type="submit" />
      )}
      <div className={cx(s.createdQuestionsContainer, { [s.onlySavedQuestions]: unsavedQuestions })}>
        <h2 className={s.header}>Test Questions</h2>
        <div className={s.content}>
          {questionList(questions, true)}
        </div>
      </div>
      <div className={cx(s.unsavedQuestionsContainer, { [s.noNewQuestions]: !allUnsavedQuestions.length })}>
        <h2 className={s.header}>New Questions</h2>
        <div className={s.content}>
          {questionList(unsavedQuestions)}
        </div>
        <div className={s.savingButtonsContainer}>
          <Button className={s.saveBtn} type="button" onClick={saveConfirmation}>Save</Button>
          <Button className={s.clearBtn} type="button" onClick={clearUnsaved}>Clear</Button>
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
