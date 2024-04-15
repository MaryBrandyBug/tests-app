'use client';

import { func } from 'prop-types';

import Button from '../Button';

import s from './ActionButtons.module.scss';

export default function ActionButtons({ deleteConfirmation }) {
  return (
    <div className={s.root}>
      <Button className={s.saveBtn} type="submit">Save</Button>
      <Button className={s.deleteBtn} onClick={deleteConfirmation}>Delete</Button>
    </div>
  );
}

ActionButtons.propTypes = {
  deleteConfirmation: func,
};
