import {
  func, node, number, oneOfType, string,
} from 'prop-types';
import cx from 'classnames';

import s from './InputField.module.scss';

export default function InputField({
  type, name, onChange, placeholder, inputFieldName, maxLength, value, additionalClass, errorMessage,
}) {
  return (
    <div className={s.root}>
      <div className={s.content}>
        <p className={s.inputName}>{inputFieldName}</p>
        <input type={type} name={name} value={value} className={cx(additionalClass, [s.inputField])} placeholder={placeholder} maxLength={maxLength} onChange={onChange} />
        {errorMessage}
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
  errorMessage: node,
};
