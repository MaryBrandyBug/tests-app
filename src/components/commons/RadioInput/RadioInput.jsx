'use client';

import { bool, func, string } from 'prop-types';
import cx from 'classnames';

import s from './RadioInput.module.scss';

export default function RadioInput({
  name, onChange, checked, text, id,
}) {
  return (
    <div className={s.root}>
      <input type="radio" name={name} value={text} className={cx(s.radioButton)} id={id} onChange={onChange} checked={checked} />
      <label className={s.label} htmlFor={id} />
      <p className={cx(s.answerText)}>{text}</p>
    </div>
  );
}

RadioInput.propTypes = {
  name: string,
  onChange: func,
  checked: bool,
  text: string,
  id: string,
};
