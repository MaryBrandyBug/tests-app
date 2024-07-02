'use client';

import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import validationSchema from '@/utils/validation/TestNameValidation';

import InputField from '../InputField';
import Button from '../Button';
import ErrorMessage from '../ErrorMessage';

import s from './AddTestForm.module.scss';

export default function AddTestForm() {
  const router = useRouter();

  const onSubmit = async (values, actions) => {
    const isValid = validationSchema.isValid(values);
    if (isValid) {
      fetch('https://interns-test-fe.snp.agency/api/v1/tests', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((res) => router.push(`/test/${res.id}`));
    }

    actions.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    onSubmit,
    validationSchema,
  });

  return (
    <form className={s.root} onSubmit={formik.handleSubmit}>
      <InputField type="text" name="title" onChange={formik.handleChange} placeholder="Enter your test name" additionalClass={s.inputField} value={formik.values.title}>
        {formik.errors.title && <ErrorMessage valueKey="title" formik={formik} />}
      </InputField>
      <Button type="submit" className={s.submitBtn}>Save</Button>
    </form>
  );
}
