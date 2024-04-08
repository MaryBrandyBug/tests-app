'use client';

import { useFormik } from 'formik';

import validationSchema from '@/utils/validation/NumberAnswerQuestionValidation';
import data from './data';

import InputField from '../InputField';
import Button from '../Button';

import s from './NumberAnswerQuestion.module.scss';

export default function NumberAnswerQuestion() {
  const onSubmit = async (values, actions) => {
    const isValid = validationSchema.isValid(values);
    if (isValid) {
      fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
    }

    actions.setSubmitting(false);
  };

  const formik = useFormik({ initialValues: { title: '', answer: '', question_type: 'number' }, onSubmit, validationSchema });

  const inputFields = data.map((item) => (
    <InputField
      key={item.id}
      type={item.type}
      name={item.name}
      value={formik.values[item.name]}
      inputFieldName={item.text}
      onChange={formik.handleChange}
      placeholder={item.placeholder}
      maxLength={item.maxLength}
      additionalClass={s.formInput}
      errorMessage={formik.touched[item.name] && formik.errors[item.name] && (
      <div className={s.errorMessageContainer}><p className={s.errorMessage}>{formik.errors[item.name]}</p></div>
      )}
    />
  ));

  return (
    <div className={s.root}>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        {inputFields}
        <div className={s.btnContainer}>
          <Button type="submit" className={s.saveBtn}>Save</Button>
          <Button className={s.deleteBtn}>Delete</Button>
        </div>
      </form>
    </div>
  );
}
