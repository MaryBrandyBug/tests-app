'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import QuestionCard from '../QuestionCard';

import s from './TestQuestionsList.module.scss';
import Button from '../Button';

export default function TestQuestionsList() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { id } = router.query;
  const { title, questions } = useSelector((store) => store.test);

  const questionList = questions?.map((item, i) => (
    <div className={s.listItem}>
      <p className={s.itemCount}>{`${i + 1}.`}</p>
      <QuestionCard title={item.title} type={item.question_type} answer={item.answer} answers={item.answers} />
    </div>
  ));

  useEffect(() => {
    if (id) {
      dispatch({ type: 'test/fetchTest', id });
    }
  }, [dispatch, id]);

  return (
    <div className={s.root}>
      <h2 className={s.testHeader}>{title}</h2>
      {questionList}
      <div className={s.btnContainer}>
        <Button className={s.finishBtn}>Finish</Button>
      </div>
    </div>
  );
}
