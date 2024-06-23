'use client';

import { bool, number, string } from 'prop-types';

import Button from '../Button';

import s from './TestCard.module.scss';

export default function TestCard({
  title, questionNumber, is_admin, id,
}) {
  return (
    <div className={`${s.root}`}>
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
        <Button href="/" className={s.startBtn}>Start</Button>
        {is_admin
        && (
          <Button href={`/test/${id}`} className={s.editBtn}>Edit</Button>
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
};
