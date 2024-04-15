'use client';

import { func, string } from 'prop-types';

import Button from '../Button';
import Modal from '../Modal';

import s from './Confirmation.module.scss';

export default function Confirmation({ header, onClick }) {
  return (
    <Modal header={header}>
      <div className={s.confirmBtnContainer}>
        <Button type="submit" className={s.confirmBtn}>Yes</Button>
        <Button onClick={onClick} className={s.notConfirmBtn}>No</Button>
      </div>
    </Modal>
  );
}

Confirmation.propTypes = {
  header: string,
  onClick: func,
};
