'use client';

import { func, string } from 'prop-types';

import Button from '../Button';
import Modal from '../Modal';

import s from './Confirmation.module.scss';

export default function Confirmation({
  header, onClick, onSubmit, closeConfirmation,
}) {
  return (
    <Modal header={header} onClick={closeConfirmation}>
      <div className={s.confirmBtnContainer}>
        <Button type="button" onClick={onSubmit} className={s.confirmBtn}>Yes</Button>
        <Button onClick={onClick} className={s.notConfirmBtn}>No</Button>
      </div>
    </Modal>
  );
}

Confirmation.propTypes = {
  header: string,
  onClick: func,
  onSubmit: func,
  closeConfirmation: func,
};
