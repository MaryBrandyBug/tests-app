'use client';

import { useFormik } from 'formik';
import { useState } from 'react';
import { func, string } from 'prop-types';

import validationSchema from '@/utils/validation/MultiAnswerQuestionValidation';

import InputField from '../InputField';
import CheckboxInput from '../CheckboxInput';
import TextAnswerCreationForm from '../TextAnswerCreationForm';
import ErrorMessage from '../ErrorMessage';

import s from './MultiAnswerQuestion.module.scss';

export default function MultiAnswerQuestion({ id, closeForm }) {
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
    closeForm();
    actions.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      question_type: 'multiple',
      answers: [
        { text: '', is_right: false },
        { text: '', is_right: false },
      ],
    },
    onSubmit,
    validationSchema,
  });

  const addField = () => {
    const { answers } = formik.values;
    formik.setFieldValue('answers', [...answers, { text: '', is_right: false }]);
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
      >
        {formik.errors.answers && formik.errors.answers[i]
        && <ErrorMessage name="text" valueKey="answers" index={i} formik={formik} />}
      </InputField>
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
        {typeof formik.errors.answers === 'string' && <ErrorMessage valueKey="answers" formik={formik} />}
      </TextAnswerCreationForm>
    </div>
  );
}

MultiAnswerQuestion.propTypes = {
  id: string,
  closeForm: func,
};
