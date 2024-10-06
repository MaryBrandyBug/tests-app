'use client';

import { func, string } from 'prop-types';

import Button from '../Button';
import Modal from '../Modal';

import s from './Confirmation.module.scss';

export default function Confirmation({
  header, onClick, closeConfirmation, type = 'button',
}) {
  return (
    <Modal header={header} onClick={closeConfirmation}>
      <div className={s.confirmBtnContainer}>
        <Button type={type} onClick={onClick} className={s.confirmBtn}>Yes</Button>
        <Button onClick={closeConfirmation} className={s.notConfirmBtn}>No</Button>
      </div>
    </Modal>
  );
}

Confirmation.propTypes = {
  header: string,
  onClick: func,
  closeConfirmation: func,
  type: string,
};
