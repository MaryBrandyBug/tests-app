'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import MultiAnswerQuestion from '../MultiAnswerQuestion';
import NumberAnswerQuestion from '../NumberAnswerQuestion';
import OneAnswerQuestion from '../OneAnswerQuestion';

import s from './QuestionUpdate.module.scss';

export default function QuestionUpdate({ handleClose }) {
  const router = useRouter();
  const { questionId, type } = router.query;

  const store = useSelector((state) => state.test.questions);
  const currentQuestionData = store?.find((question) => question.id === Number(questionId));

  return (
    <div className={s.root}>
      {currentQuestionData && type === 'number' && (<NumberAnswerQuestion id={questionId} data={currentQuestionData} closeForm={handleClose} />)}
      {currentQuestionData && type === 'single' && (<OneAnswerQuestion id={questionId} data={currentQuestionData} closeForm={handleClose} />)}
      {currentQuestionData && type === 'multiple' && (<MultiAnswerQuestion id={questionId} data={currentQuestionData} closeForm={handleClose} />)}
    </div>
  );
}
