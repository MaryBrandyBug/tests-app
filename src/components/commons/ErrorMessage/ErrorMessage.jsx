'use client';

import s from './ErrorMessage.module.scss';

export default function ErrorMessage({ name, formik }) {
  return formik.touched[name] && formik.errors[name] && (
    <div className={s.root}>{formik.errors[name]}</div>
  );
}
