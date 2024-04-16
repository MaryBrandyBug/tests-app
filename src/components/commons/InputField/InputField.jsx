'use client';

import {
  bool,
  func, node, number, oneOfType, string,
} from 'prop-types';
import { useEffect } from 'react';
import cx from 'classnames';
import autosize from 'autosize';

import s from './InputField.module.scss';

export default function InputField({
  type, name, onChange, placeholder, inputFieldName, maxLength, value, additionalClass, textarea = false, children,
}) {
  useEffect(() => {
    autosize(document.querySelectorAll('textarea'));
  }, []);

  return (
    <div className={s.root}>
      <div className={s.content}>
        <p className={s.inputName}>{inputFieldName}</p>
        { textarea ? <textarea type={type} name={name} value={value} className={cx(additionalClass, [s.textareaField])} maxLength={maxLength} onChange={onChange} /> : <input type={type} name={name} value={value} className={cx(additionalClass, [s.inputField])} placeholder={placeholder} maxLength={maxLength} onChange={onChange} />}
        {children}
      </div>
    </div>
  );
}

InputField.propTypes = {
  type: string,
  name: string,
  onChange: func,
  placeholder: string,
  inputFieldName: string,
  maxLength: string,
  value: oneOfType([string, number]),
  additionalClass: string,
  textarea: bool,
  children: node,
};
