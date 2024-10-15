'use client';

import { func, string } from 'prop-types';

import Button from '../Button';

import s from './ActionButtons.module.scss';

export default function ActionButtons({ closeForm, typeSave = 'button', saveConfirmation }) {
  return (
    <div className={s.root}>
      <Button className={s.saveBtn} type={typeSave} onClick={saveConfirmation}>Save</Button>
      <Button className={s.deleteBtn} onClick={closeForm}>Cancel</Button>
    </div>
  );
}

ActionButtons.propTypes = {
  closeForm: func,
  typeSave: string,
  saveConfirmation: func,
};
