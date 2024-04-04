'use client';

import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import Image from 'next/image';

import validationSchema from '@/utils/validation';
import data from './data';

import Button from '../Button';
import InputField from '../InputField';

import s from './SignUpForm.module.scss';
import { manjari } from '@/styles/fonts';

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

  const formik = useFormik({
    initialValues: {
      username: '', password: '', password_confirmation: '', is_admin: false,
    },
    onSubmit,
    validationSchema,
  });

  const inputFields = data.map((item) => (
    <>
      <InputField type={item.type} name={item.name} value={formik.values[item.name]} onChange={formik.handleChange} placeholder={item.placeholder} maxLength={item.maxLength} additionalClass={s.formInput} />
      {formik.touched[item.name] && formik.errors[item.name] && (
      <div className={s.errorMessageContainer}><p className={s.errorMessage}>{formik.errors[item.name]}</p></div>
      )}
    </>
  ));

  return (
    <div className={`${s.root} ${manjari.className}`}>
      <div className={s.imgContainer}>
        <Image src="/signUpFormPic.jpg" alt="" width={600} height={300} />
      </div>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        {inputFields}
        <div className={s.btnContainer}>
          <Button type="submit" className={s.createBtn}>Create</Button>
        </div>
        <div className={s.signUpLinkContainer}>
          <p>
            Already have an account?
            {' '}
            <Button href="/signin" className={s.signUpLink}>Sign In</Button>
          </p>
        </div>
      </form>
    </div>
  );
}
