'use client';

import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import Image from 'next/image';

import validationSchema from '@/utils/validation';

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

  return (
    <div className={`${s.root} ${manjari.className}`}>
      <div className={s.imgContainer}>
        <Image src="/signUpFormPic.jpg" alt="" width={600} height={300} />
      </div>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <InputField type="text" name="username" value={formik.values.username} onChange={formik.handleChange} placeholder="Create your username" maxLength="15" additionalClass={s.formInput} />
        <InputField type="text" name="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Create your password" maxLength="15" additionalClass={s.formInput} />
        <InputField type="text" name="password_confirmation" value={formik.values.password_confirmation} onChange={formik.handleChange} placeholder="Confirm your password" maxLength="15" additionalClass={s.formInput} />
        <div className={s.btnContainer}>
          <Button type="submit" className={s.createBtn}>Create</Button>
        </div>
        <div className={s.signUpLinkContainer}>
          <p>
            Already have an account?
            {' '}
            <Button href="/" className={s.signUpLink}>Sign In</Button>
          </p>
        </div>
      </form>
    </div>
  );
}
