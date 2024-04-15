'use client';

import { useFormik } from 'formik';
import { useEffect, useState } from 'react';

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

  const addField = () => {
    setAnswers((prevAnswers) => [...prevAnswers, { text: '', is_right: false }]);
  };

  const onSubmit = async (values, actions) => {
    setOpenSaveConfirmation(true);
    // const isValid = validationSchema.isValid(values);
    // if (isValid) {
    fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    // }
    closeModal();
    actions.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      question:
      { title: '', question_type: 'single' },
      answers,
    },
    onSubmit,
    /* validationSchema, */
  });

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      answers,
    });
  }, [answers]);

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
        name="question.title"
        value={formik.values.question.title}
        onChange={formik.handleChange}
        onSubmit={formik.handleSubmit}
      >
        {inputs}
      </TextAnswerCreationForm>
    </div>
  );
}
