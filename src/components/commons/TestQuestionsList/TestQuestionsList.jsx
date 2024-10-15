'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { func } from 'prop-types';

import useModal from '@/hooks/useModal';
import { selectTest } from '@/constants/selectors';

import QuestionCard from '../QuestionCard';
import Button from '../Button';
import Confirmation from '../Confirmation';

import s from './TestQuestionsList.module.scss';

export default function TestQuestionsList({ manageTotalScoreModal }) {
  const [openModal, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({});

  const router = useRouter();
  const dispatch = useDispatch();

  const { id } = router.query;
  const { title, questions } = useSelector(selectTest);

  const questionChange = (questionId) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [questionId]: '',
    }));
  };

  const handleAnswerChange = (questionId, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [questionId]: value,
    }));
  };

  const questionList = questions?.map((item, i) => (
    <div className={s.listItem} key={item.id}>
      <p className={s.itemCount}>{`${i + 1}.`}</p>
      <QuestionCard questionId={item.id} title={item.title} handleAnswerChange={handleAnswerChange} questionChange={questionChange} value={formValues[item?.id]} type={item.question_type} answer={item.answer} answers={item.answers} />
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

  const onFinish = () => {
    let userScore = 0;
    const totalScore = questions.length;

    questions.forEach((question) => {
      const questionId = question.id;
      const value = formValues[questionId];

      if (value.length >= 0 && question.answer === Number(value)) {
        userScore += 1;
      } else if (Object.keys(value).length > 0) {
        const trueAnswersId = question.answers
          .filter((item) => item.is_right)
          .map((item) => item.id);
        const userAnswerIsCorrect = trueAnswersId.every((key) => key in value);

        if (userAnswerIsCorrect) {
          userScore += 1;
        }
      }
    });

    setModalOpen(false);
    manageTotalScoreModal(totalScore, userScore);
  };

  useModal(openModal);

  return (
    <div className={s.root}>
      {openModal && <Confirmation closeConfirmation={closeConfirmation} onClick={onFinish} header="Do you want to finish the test?" />}
      <h2 className={s.testHeader}>{title}</h2>
      <form className={s.form}>
        {questionList}
        <div className={s.btnContainer}>
          <Button type="button" className={s.finishBtn} onClick={handleClick}>Finish</Button>
        </div>
      </form>
    </div>
  );
}

TestQuestionsList.propTypes = {
  manageTotalScoreModal: func,
};
