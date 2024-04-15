'use client';

import { useState } from 'react';
import { useFormik } from 'formik';

import validationSchema from '@/utils/validation/NumberAnswerQuestionValidation';
import data from './data';

import Confirmation from '../Confirmation';
import InputField from '../InputField';
import Button from '../Button';

import s from './NumberAnswerQuestion.module.scss';

export default function NumberAnswerQuestion() {
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
    closeModal();
    actions.setSubmitting(false);
  };

  const formik = useFormik({ initialValues: { title: '', answer: '', question_type: 'number' }, onSubmit, validationSchema });

  const inputFields = data.map((item) => (
    <div key={item.id}>
      <InputField
        type={item.type}
        name={item.name}
        value={formik.values[item.name]}
        inputFieldName={item.text}
        onChange={formik.handleChange}
        placeholder={item.placeholder}
        maxLength={item.maxLength}
        additionalClass={s.formInput}
      />
      {formik.touched[item.name] && formik.errors[item.name] && (
      <div className={s.errorMessage}>{formik.errors[item.name]}</div>
      )}
    </div>
  ));

  return (
    <div className={s.root}>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        { openSaveConfirmation && (
        <Confirmation header="Do you want to save your question?" onClick={closeModal} />
        )}
        {inputFields}
        <div className={s.btnContainer}>
          <Button className={s.saveBtn} type="submit">Save</Button>
          <Button className={s.deleteBtn} onClick={deleteConfirmation}>Delete</Button>
        </div>
      </form>
    </div>
  );
}
