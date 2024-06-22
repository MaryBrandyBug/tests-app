'use client';

import { bool, number, string } from 'prop-types';
import Image from 'next/image';

import Button from '../Button';

import s from './TestCard.module.scss';

export default function TestCard({
  title, questionNumber, is_admin, id,
}) {
  return (
    <div className={s.root}>
      <div className={s.title}>
        <p>{title}</p>
      </div>
      <div className={s.questionNumber}>
        <p>
          Question number:
          {questionNumber}
        </p>
      </div>
      {is_admin && <Button href={`/test/${id}`}><Image src="/pencil.svg" alt="edit test link" width={50} height={50} /></Button>}
    </div>
  );
}

TestCard.propTypes = {
  title: string,
  questionNumber: number,
  is_admin: bool,
  id: number,
};
