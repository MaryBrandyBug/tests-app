'use client';

import { func, string } from 'prop-types';

import Button from '../Button';

import s from './ActionButtons.module.scss';

export default function ActionButtons({ deleteConfirmation, typeSave = 'button', saveConfirmation }) {
  return (
    <div className={s.root}>
      <Button className={s.saveBtn} type={typeSave} onClick={saveConfirmation}>Save</Button>
      <Button className={s.deleteBtn} onClick={deleteConfirmation}>Delete</Button>
    </div>
  );
}

ActionButtons.propTypes = {
  deleteConfirmation: func,
  typeSave: string,
  saveConfirmation: func,
};
