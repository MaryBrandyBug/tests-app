'use client';

import { useFormik } from 'formik';
import { useState } from 'react';
import { func, string } from 'prop-types';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import validationSchema from '@/utils/validation/OneAnswerValidation';
import { addQuestion } from '@/redux/store/slicer/unsavedQuestionsSlicer';
import useModal from '@/hooks/useModal';

import InputField from '../InputField';
import CheckboxInput from '../CheckboxInput';
import TextAnswerCreationForm from '../TextAnswerCreationForm';
import ErrorMessage from '../ErrorMessage';

import s from './OneAnswerQuestion.module.scss';

export default function OneAnswerQuestion({ id, closeForm, data }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [openSaveConfirmation, setOpenSaveConfirmation] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const initialValues = {
    title: data?.title || '',
    question_type: 'single',
    answers: data?.answers || [
      { text: '', is_right: false },
      { text: '', is_right: false },
    ],
  };

  const deleteConfirmation = () => {
    setOpenDeleteConfirmation(true);
  };

  const closeModal = () => {
    if (openSaveConfirmation) setOpenSaveConfirmation(false);
    if (openDeleteConfirmation) setOpenDeleteConfirmation(false);
  };

  const onSubmit = async (values, actions) => {
    const isValid = validationSchema.isValid(values);

    if (isValid) {
      if (data?.id) {
        console.log(1);
      }
      dispatch(addQuestion({ values, id }));
    }

    router.push(`/test/${id}`);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const addField = () => {
    const { answers } = formik.values;
    formik.setFieldValue('answers', [...answers, { text: '', is_right: false }]);
  };

  const saveConfirmation = async () => {
    formik.setTouched({
      title: true,
      answers: formik.values.answers.map(() => ({ text: true })),
    });

    const isValid = await validationSchema.isValid(formik.values);
    if (isValid) {
      setOpenSaveConfirmation(true);
    }
  };

  const inputs = formik.values.answers.map((item, i) => (
    <div className={s.answerBlock} key={i}>
      <CheckboxInput
        name={`answers[${i}].is_right`}
        id={`answers[${i}]`}
        onChange={formik.handleChange}
        checked={formik.values.answers[i].is_right}
        additionalClassContainer={s.checkboxContainer}
        additionalClassInput={s.checkboxInput}
      />
      <InputField
        type="text"
        name={`answers[${i}].text`}
        value={formik.values.answers[i].text}
        onChange={formik.handleChange}
        additionalClass={s.answerInput}
        onBlur={formik.handleBlur}
        textarea
      >
        {formik.errors.answers && formik.errors.answers[i]
        && <ErrorMessage name="text" valueKey="answers" index={i} formik={formik} />}
      </InputField>
    </div>
  ));

  useModal(openDeleteConfirmation || openSaveConfirmation);

  return (
    <div className={s.root}>
      <TextAnswerCreationForm
        openSaveConfirmation={openSaveConfirmation}
        closeModal={closeModal}
        addField={addField}
        deleteConfirmation={deleteConfirmation}
        saveConfirmation={saveConfirmation}
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
