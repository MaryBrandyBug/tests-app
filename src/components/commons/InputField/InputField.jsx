import { func, string } from 'prop-types';
import classNames from 'classnames/bind';

import s from './InputField.module.scss';

export default function InputField({
  type, name, onChange, placeholder, inputFieldName, maxLength, value,
}) {
  const cx = classNames.bind(s);

  return (
    <div className={s.root}>
      <div className={s.content}>
        <p className={cx('input-name')}>{inputFieldName}</p>
        <input type={type} name={name} value={value} className={cx('input-field')} placeholder={placeholder} maxLength={maxLength} onChange={onChange} />
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
};
