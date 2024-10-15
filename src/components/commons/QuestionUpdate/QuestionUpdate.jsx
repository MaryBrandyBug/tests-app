'use client';

import { useRouter } from 'next/router';
import { bool, func } from 'prop-types';

import MultiAnswerQuestion from '../MultiAnswerQuestion';
import NumberAnswerQuestion from '../NumberAnswerQuestion';
import OneAnswerQuestion from '../OneAnswerQuestion';

import s from './QuestionUpdate.module.scss';

export default function QuestionUpdate({ questionFormType, handleClose }) {
  const router = useRouter();
  const { type } = router.query;

  return (
    <div className={s.root}>
      {type === 'number' && questionFormType && (<NumberAnswerQuestion closeForm={handleClose} />)}
      {type === 'single' && questionFormType && (<OneAnswerQuestion closeForm={handleClose} />)}
      {type === 'multiple' && questionFormType && (<MultiAnswerQuestion closeForm={handleClose} />)}
    </div>
  );
}

QuestionUpdate.propTypes = {
  questionFormType: bool,
  handleClose: func,
};
