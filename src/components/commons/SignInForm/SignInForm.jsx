'use client';

import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import Image from 'next/image';

import validationSchema from '@/utils/validation';

import Button from '../Button';
import InputField from '../InputField';

import s from './SignInForm.module.scss';

export default function SignInForm() {
  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    const isValid = 'valid';
    if (isValid) {
      fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((res) => dispatch(res));
    }

    actions.setSubmitting(false);
  };

  const formik = useFormik({ initialValues: { username: '', password: '' }, onSubmit, validationSchema });

  return (
    <div className={s.root}>
      <div className={s.imgContainer}>
        <Image src="/signInFormPic.jpg" alt="" width={600} height={300} />
      </div>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <InputField type="text" name="" value={formik.values.username} onChange={formik.handleChange} placeholder="Enter your username" maxLength="15" />
        <InputField type="text" name="" value={formik.values.password} onChange={formik.handleChange} placeholder="Enter your password" maxLength="15" />
        <div className={s.btnContainer}>
          <Button type="submit" className={s.enterBtn}>Enter</Button>
        </div>
      </form>
    </div>
  );
}
