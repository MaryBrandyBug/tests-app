import Image from 'next/image';
import {
  bool, func, number, oneOfType, string,
} from 'prop-types';

import stringLengthCheck from '@/utils/stringLengthCheck';

import Button from '../Button';

import s from './QuestionMenuItem.module.scss';

export default function QuestionMenuItem({
  id, title, sequenceNumber, numeration, handleDelete,
}) {
  return (
    <div className={s.root}>
      {numeration
        && (
        <div className={s.counterContainer}>
          <p>{sequenceNumber}</p>
        </div>
        )}
      <p className={s.title}>{stringLengthCheck(title, 45)}</p>
      <div className={s.editButtonsContainer}>
        <Button className={s.questionBtn} onClick={handleDelete}><Image src="/rubbishBin.svg" alt="remove question" width={30} height={30} /></Button>
        <Button className={s.questionBtn}><Image src="/pencil.svg" alt="update question" width={30} height={30} /></Button>
      </div>
    </div>
  );
}

QuestionMenuItem.propTypes = {
  id: oneOfType([number, string]),
  title: string,
  sequenceNumber: number,
  numeration: bool,
  handleDelete: func,
};
