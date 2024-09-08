'use client';

import {
  bool, func, string,
} from 'prop-types';

import MultiAnswerQuestion from '../MultiAnswerQuestion';
import NumberAnswerQuestion from '../NumberAnswerQuestion';
import OneAnswerQuestion from '../OneAnswerQuestion';

import s from './QuestionCreation.module.scss';

export default function QuestionCreation({
  currentQuestionCreation, questionFormType, id, handleClose, data,
}) {
  return (
    <div className={s.root}>
      {currentQuestionCreation === 'number' && questionFormType && (<NumberAnswerQuestion id={id} data={data} closeForm={handleClose} />)}
      {currentQuestionCreation === 'single' && questionFormType && (<OneAnswerQuestion id={id} closeForm={handleClose} />)}
      {currentQuestionCreation === 'multiple' && questionFormType && (<MultiAnswerQuestion id={id} closeForm={handleClose} />)}
    </div>
  );
}

QuestionCreation.propTypes = {
  currentQuestionCreation: string,
  questionFormType: bool,
  id: string,
  handleClose: func,
};
