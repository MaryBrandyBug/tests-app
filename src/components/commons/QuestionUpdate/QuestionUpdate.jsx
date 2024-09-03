'use client';

import { useSelector } from 'react-redux';

import MultiAnswerQuestion from '../MultiAnswerQuestion';
import NumberAnswerQuestion from '../NumberAnswerQuestion';
import OneAnswerQuestion from '../OneAnswerQuestion';

import s from './QuestionUpdate.module.scss';

export default function QuestionUpdate({
  currentQuestionUpdate, questionFormType, id, handleClose,
}) {
  const store = useSelector((state) => state.test.questions);
  const currentQuestionData = store?.find((question) => question.id === Number(id));

  return (
    <div className={s.root}>
      {currentQuestionUpdate === 'number' && questionFormType && (<NumberAnswerQuestion id={id} closeForm={handleClose} />)}
      {currentQuestionUpdate === 'single' && questionFormType && (<OneAnswerQuestion id={id} closeForm={handleClose} />)}
      {currentQuestionUpdate === 'multiple' && questionFormType && (<MultiAnswerQuestion id={id} closeForm={handleClose} />)}
    </div>
  );
}
