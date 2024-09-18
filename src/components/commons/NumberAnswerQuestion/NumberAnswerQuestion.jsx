'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { func, object, string } from 'prop-types';
import { useRouter } from 'next/router';

import validationSchema from '@/utils/validation/NumberAnswerQuestionValidation';
import inputAttributes from './data';
import { addQuestion } from '@/redux/store/slicer/unsavedQuestionsSlicer';

import Confirmation from '../Confirmation';
import InputField from '../InputField';
import ActionButtons from '../ActionButtons';
import ErrorMessage from '../ErrorMessage';

import s from './NumberAnswerQuestion.module.scss';

export default function NumberAnswerQuestion({ id, closeForm, data }) {
  const dispatch = useDispatch();
  const router = useRouter();

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
    const isValid = await validationSchema.isValid(values);

    if (isValid) {
      dispatch(addQuestion({ values, id }));
    // fetch(`https://interns-test-fe.snp.agency/api/v1/tests/${Number(id)}/questions`, {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
    //   },
    //   body: JSON.stringify(values),
    // })
    //   .then((res) => res.json())
    //   .then((res) => dispatch(addQuestion(res)));
    }

    closeModal();
    closeForm();
    actions.setSubmitting(false);
  };

  const formik = useFormik({ initialValues: { title: data?.title || '', answer: data?.answer || '', question_type: 'number' }, onSubmit, validationSchema });

  const saveConfirmation = async () => {
    const isValid = await validationSchema.isValid(formik.values);

    if (isValid) {
      setOpenSaveConfirmation(true);
    }
  };

  const inputFields = inputAttributes.map((item) => (
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
        onBlur={formik.handleBlur}
      >
        {formik.errors[item.name] && <ErrorMessage valueKey={item.name} formik={formik} />}
      </InputField>
    </div>
  ));

  return (
    <div className={s.root}>
      <form className={s.form}>
        { openSaveConfirmation && (
        <Confirmation header="Do you want to save your question?" onSubmit={formik.handleSubmit} onClick={closeModal} />
        )}
        {inputFields}
        <ActionButtons deleteConfirmation={deleteConfirmation} saveConfirmation={saveConfirmation} typeSave="button" />
      </form>
    </div>
  );
}

NumberAnswerQuestion.propTypes = {
  id: string,
  closeForm: func,
  data: object,
};
