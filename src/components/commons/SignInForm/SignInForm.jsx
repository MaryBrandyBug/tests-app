'use client';

import { useEffect } from 'react';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

// import validationSchema from '@/utils/validation/signUpValidation';
import { getUser } from '@/redux/store/slicer/userSlicer';

import Button from '../Button';
import InputField from '../InputField';

import s from './SignInForm.module.scss';
import { manjari } from '@/styles/fonts';

export default function SignInForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    const isValid = 'valid';
    if (isValid) {
      fetch('https://interns-test-fe.snp.agency/api/v1/signin', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((res) => dispatch(getUser(res)))
        .then(() => router.push('/'));
    }

    actions.setSubmitting(false);
  };

  const formik = useFormik({ initialValues: { username: '', password: '' }, onSubmit/* , validationSchema */ });

  return (
    <div className={`${s.root} ${manjari.className}`}>
      <div className={s.imgContainer}>
        <Image src="/signInFormPic.jpg" alt="" width={600} height={300} />
      </div>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <InputField type="text" name="username" value={formik.values.username} onChange={formik.handleChange} placeholder="Enter your username" maxLength="15" additionalClass={s.formInput} />
        <InputField type="text" name="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Enter your password" maxLength="15" additionalClass={s.formInput} />
        <div className={s.btnContainer}>
          <Button type="submit" className={s.enterBtn}>Enter</Button>
        </div>
        <div className={s.signUpLinkContainer}>
          <p>
            New to My tests?
            {' '}
            <Button href="/signup" className={s.signUpLink}>Sign Up</Button>
          </p>
        </div>
      </form>
    </div>
  );
}
