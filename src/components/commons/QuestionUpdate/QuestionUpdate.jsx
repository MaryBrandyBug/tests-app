'use client';

import { useRouter } from 'next/router';
import { bool } from 'prop-types';

import MultiAnswerQuestion from '../MultiAnswerQuestion';
import NumberAnswerQuestion from '../NumberAnswerQuestion';
import OneAnswerQuestion from '../OneAnswerQuestion';

import s from './QuestionUpdate.module.scss';

export default function QuestionUpdate({ questionFormType }) {
  const router = useRouter();
  const { type } = router.query;

  return (
    <div className={s.root}>
      {type === 'number' && questionFormType && (<NumberAnswerQuestion />)}
      {type === 'single' && questionFormType && (<OneAnswerQuestion />)}
      {type === 'multiple' && questionFormType && (<MultiAnswerQuestion />)}
    </div>
  );
}

QuestionUpdate.propTypes = {
  questionFormType: bool,
};
