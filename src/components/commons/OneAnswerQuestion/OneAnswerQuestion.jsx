'use client';

import { useFormik } from 'formik';
import { useState } from 'react';

import validationSchema from '@/utils/validation/OneAnswerValidation';

import InputField from '../InputField';
import CheckboxInput from '../CheckboxInput';
import TextAnswerCreationForm from '../TextAnswerCreationForm';

import s from './OneAnswerQuestion.module.scss';

export default function OneAnswerQuestion() {
  const [openSaveConfirmation, setOpenSaveConfirmation] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [answers, setAnswers] = useState([
    { text: '', is_right: false },
    { text: '', is_right: false },
  ]);

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

  const formik = useFormik({
    initialValues: {
      title: '',
      question_type: 'single',
      answers,
    },
    onSubmit,
    validationSchema,
  });

  const addField = () => {
    const newAnswers = [...answers, { text: '', is_right: false }];
    setAnswers(newAnswers);
    formik.setFieldValue('answers', newAnswers);
  };

  const inputs = formik.values.answers.map((item, i) => (
    <div className={s.answerBlock} key={i}>
      <CheckboxInput
        name={`answers[${i}].is_right`}
        id={`answers[${i}]`}
        onChange={formik.handleChange}
        checked={formik.values.answers[i].is_right}
        additionalClass={s.checkboxStyles}
      />
      <InputField
        type="text"
        name={`answers[${i}].text`}
        value={formik.values.answers[i].text}
        onChange={formik.handleChange}
        additionalClass={s.answerInput}
        textarea
      />
    </div>
  ));

  return (
    <div className={s.root}>
      <TextAnswerCreationForm
        openSaveConfirmation={openSaveConfirmation}
        closeModal={closeModal}
        addField={addField}
        deleteConfirmation={deleteConfirmation}
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onSubmit={formik.handleSubmit}
        formik={formik}
      >
        {inputs}
      </TextAnswerCreationForm>
    </div>
  );
}
