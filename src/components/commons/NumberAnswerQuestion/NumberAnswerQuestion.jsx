'use client';

import { useState } from 'react';
import { useFormik } from 'formik';

import validationSchema from '@/utils/validation/NumberAnswerQuestionValidation';
import data from './data';

import Modal from '../Modal';
import InputField from '../InputField';
import Button from '../Button';

import s from './NumberAnswerQuestion.module.scss';

export default function NumberAnswerQuestion() {
  const [openSaveConfirmation, setOpenSaveConfirmation] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const deleteConfirmation = () => {
    setOpenDeleteConfirmation(true);
  };

  const saveConfirmation = () => {
    setOpenSaveConfirmation(true);
  };

  const closeModal = () => {
    if (openSaveConfirmation) setOpenSaveConfirmation(false);
    if (openDeleteConfirmation) setOpenDeleteConfirmation(false);
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
    closeModal();
    actions.setSubmitting(false);
  };

  const onClick = async (values) => {
    console.log(values);
    const isValid = validationSchema.isValid(values);
    if (isValid) {
      setOpenSaveConfirmation(true);
    }
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
      errorMessage={formik.touched[item.name] && formik.errors[item.name] ? (
        <div className={s.errorMessageContainer}><p className={s.errorMessage}>{formik.errors[item.name]}</p></div>
      ) : null}
    />
  ));

  return (
    <div className={s.root}>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        { openSaveConfirmation && (
        <Modal header="Do you want to save your question?">
          <div>
            <Button type="submit">Yes</Button>
            <Button onClick={closeModal}>No</Button>
          </div>
        </Modal>
        )}
        {inputFields}
      </form>
      <div className={s.btnContainer}>
        <Button className={s.saveBtn} onClick={onClick}>Save</Button>
        <Button className={s.deleteBtn} onClick={deleteConfirmation}>Delete</Button>
      </div>
    </div>
  );
}
