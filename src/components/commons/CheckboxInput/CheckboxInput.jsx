'use client';

import { bool, func, string } from 'prop-types';
import cx from 'classnames';

import s from './CheckboxInput.module.scss';

export default function CheckboxInput({
  name, id, onChange, checked, additionalClassContainer, additionalClassInput,
}) {
  return (
    <div className={cx([s.root], additionalClassContainer)}>
      <input type="checkbox" name={name} className={cx([s.button], additionalClassInput)} id={id} onChange={onChange} checked={checked} />
      <label className={s.label} htmlFor={id} />
    </div>
  );
}

CheckboxInput.propTypes = {
  name: string,
  id: string,
  checked: bool,
  onChange: func,
  additionalClassContainer: string,
  additionalClassInput: string,
};
