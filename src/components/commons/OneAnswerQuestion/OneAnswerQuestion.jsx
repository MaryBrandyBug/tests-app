'use client';

import { useFormik } from 'formik';
import { useState } from 'react';
import { func, string } from 'prop-types';
import { useDispatch } from 'react-redux';

import validationSchema from '@/utils/validation/OneAnswerValidation';
import { addQuestion } from '@/redux/store/slicer/testSlicer';

import InputField from '../InputField';
import CheckboxInput from '../CheckboxInput';
import TextAnswerCreationForm from '../TextAnswerCreationForm';
import ErrorMessage from '../ErrorMessage';

import s from './OneAnswerQuestion.module.scss';

export default function OneAnswerQuestion({ id, closeForm }) {
  const [openSaveConfirmation, setOpenSaveConfirmation] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const dispatch = useDispatch();

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
      fetch(`https://interns-test-fe.snp.agency/api/v1/tests/${Number(id)}/questions`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((res) => dispatch(addQuestion(res)));
    }

    closeModal();
    closeForm();
    actions.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      question_type: 'single',
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

OneAnswerQuestion.propTypes = {
  id: string,
  closeForm: func,
};
