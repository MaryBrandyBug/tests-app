'use client';

import { number, object, string } from 'prop-types';

import s from './ErrorMessage.module.scss';

export default function ErrorMessage({
  name, valueKey, formik, index,
}) {
  const { errors, touched } = formik;

  if (index !== undefined && index !== null) {
    return errors[valueKey]
          && errors[valueKey][index][name]
          && touched
          && touched[valueKey]
          && touched[valueKey][index]
          && touched[valueKey][index][name] && (
          <div className={s.root}>
            {errors[valueKey][index][name]}
          </div>
    );
  }

  return errors[valueKey]
    && touched
    && touched[valueKey]
    && (
      <div className={s.root}>
        {errors[valueKey]}
      </div>
    );
}

ErrorMessage.propTypes = {
  name: string,
  valueKey: string,
  formik: object,
  index: number,
};
