'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import QuestionCard from '../QuestionCard';
import Button from '../Button';
import Confirmation from '../Confirmation';

import s from './TestQuestionsList.module.scss';

export default function TestQuestionsList() {
  const [openModal, setModalOpen] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const { id } = router.query;
  const { title, questions } = useSelector((store) => store.test);

  const questionList = questions?.map((item, i) => (
    <div className={s.listItem} key={item.id}>
      <p className={s.itemCount}>{`${i + 1}.`}</p>
      <QuestionCard questionId={item.id} title={item.title} type={item.question_type} answer={item.answer} answers={item.answers} />
    </div>
  ));

  useEffect(() => {
    if (id) {
      dispatch({ type: 'test/fetchTest', id });
    }
  }, [dispatch, id]);

  const handleClick = () => {
    setModalOpen(true);
  };

  const closeConfirmation = () => {
    setModalOpen(false);
  };

  const getTestResult = () => {

  };

  return (
    <div className={s.root}>
      {openModal && <Confirmation closeConfirmation={closeConfirmation} header="Do you want to finish the test?" onClick={closeConfirmation} />}
      <h2 className={s.testHeader}>{title}</h2>
      {questionList}
      <div className={s.btnContainer}>
        <Button className={s.finishBtn} onClick={handleClick}>Finish</Button>
      </div>
    </div>
  );
}
