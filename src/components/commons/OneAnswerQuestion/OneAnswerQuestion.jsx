'use client';

import { useFormik } from 'formik';
import { useState } from 'react';

import validationSchema from '@/utils/validation/OneAnswerValidation';

import InputField from '../InputField';
import Button from '../Button';

import s from './OneAnswerQuestion.module.scss';

export default function OneAnswerQuestion() {
  const [numberOfInputs, setNumberOfInputs] = useState(2);

  const handleAddInput = () => {
    setNumberOfInputs((item) => item + 1);
  };

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

  const formik = useFormik({ initialValues: { title: '', answers: ['', ''], question_type: 'number' }, onSubmit, validationSchema });

  const inputFields = Array.from({ length: numberOfInputs }, (_, index) => (
    <InputField
      key={index}
      type="text"
      name={`answers[${index}]`}
      additionalClass={s.answerInput}
      value={formik.values.answers[index] || ''}
      onChange={formik.handleChange}
      textarea
    />
  ));

  return (
    <div className={s.root}>
      <form className={s.form}>
        <InputField
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          inputFieldName="Enter your question"
          maxLength="100"
          additionalClass={s.questionInput}
          textarea
        />
        <div className={s.answersContainer}>
          {inputFields}
        </div>
        <div>
          <Button type="button" onClick={handleAddInput}>Add answer</Button>
        </div>
      </form>
    </div>
  );
}
