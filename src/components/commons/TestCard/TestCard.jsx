'use client';

import {
  bool, func, number, string,
} from 'prop-types';

import Button from '../Button';

import s from './TestCard.module.scss';

export default function TestCard({
  title, questionNumber, is_admin, id, onClick,
}) {
  const runTest = (e) => {
    onClick(e, id);
  };

  return (
    <div className={`${s.root}`} onClick={runTest}>
      <div className={s.content}>
        <div className={s.title}>
          <p>{title}</p>
        </div>
        <div className={s.questionNumber}>
          <p>
            Question number:
            {questionNumber}
          </p>
        </div>
      </div>
      <div className={s.btnContainer}>
        {is_admin
        && (
          <Button href={`/editing/${id}`} className={s.editBtn}>Edit</Button>
        )}
      </div>
    </div>
  );
}

TestCard.propTypes = {
  title: string,
  questionNumber: number,
  is_admin: bool,
  id: number,
  onClick: func,
};
