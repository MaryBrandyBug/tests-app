'use client';

import {
  bool, func, string,
} from 'prop-types';

import MultiAnswerQuestion from '../MultiAnswerQuestion';
import NumberAnswerQuestion from '../NumberAnswerQuestion';
import OneAnswerQuestion from '../OneAnswerQuestion';

import s from './QuestionCreation.module.scss';

export default function QuestionCreation({
  currentQuestionCreation, questionFormType, handleClose,
}) {
  return (
    <div className={s.root}>
      {currentQuestionCreation === 'number' && questionFormType && (<NumberAnswerQuestion closeForm={handleClose} />)}
      {currentQuestionCreation === 'single' && questionFormType && (<OneAnswerQuestion closeForm={handleClose} />)}
      {currentQuestionCreation === 'multiple' && questionFormType && (<MultiAnswerQuestion closeForm={handleClose} />)}
    </div>
  );
}

QuestionCreation.propTypes = {
  currentQuestionCreation: string,
  questionFormType: bool,
  handleClose: func,
};
