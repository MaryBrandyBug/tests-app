import { func, string } from 'prop-types';
import cx from 'classnames';

import s from './InputField.module.scss';

export default function InputField({
  type, name, onChange, placeholder, inputFieldName, maxLength, value, additionalClass,
}) {
  return (
    <div className={s.root}>
      <div className={s.content}>
        <p className={s.inputName}>{inputFieldName}</p>
        <input type={type} name={name} value={value} className={cx(additionalClass, [s.inputField])} placeholder={placeholder} maxLength={maxLength} onChange={onChange} />
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
  value: string,
  additionalClass: string,
};
