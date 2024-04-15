'use client';

import { useFormik } from 'formik';
import { useState } from 'react';

import InputField from '../InputField';
import Confirmation from '../Confirmation';

import s from './MultiAnswerQuestion.module.scss';

export default function MultiAnswerQuestion() {
  const [openSaveConfirmation, setOpenSaveConfirmation] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const deleteConfirmation = () => {
    setOpenDeleteConfirmation(true);
  };

  const closeModal = () => {
    if (openSaveConfirmation) setOpenSaveConfirmation(false);
    if (openDeleteConfirmation) setOpenDeleteConfirmation(false);
  };

  const onSubmit = async (values, actions) => {
    setOpenSaveConfirmation(true);
    fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    closeModal();
    actions.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      question:
      { title: '', question_type: 'multiple' },
      // answers,
    },
    onSubmit,
    /* validationSchema, */
  });

  return (
    <div className={s.root}>
      <form className={s.form} onSubmit={onSubmit}>
        { openSaveConfirmation && (
        <Confirmation header="Do you want to save your question?" onClick={closeModal} />
        )}
        <InputField
          name="question.title"
          value={formik.values.question.title}
          onChange={formik.handleChange}
          inputFieldName="Enter your question"
          maxLength="100"
          additionalClass={s.questionInput}
          textarea
        />
      </form>
    </div>
  );
}
