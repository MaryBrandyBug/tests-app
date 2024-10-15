'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { func } from 'prop-types';

import validationSchema from '@/utils/validation/NumberAnswerQuestionValidation';
import inputAttributes from './data';
import { addUnsavedQuestion } from '@/redux/store/slicer/unsavedQuestionsSlicer';
import useModal from '@/hooks/useModal';

import Confirmation from '../Confirmation';
import InputField from '../InputField';
import ActionButtons from '../ActionButtons';
import ErrorMessage from '../ErrorMessage';

import s from './NumberAnswerQuestion.module.scss';

export default function NumberAnswerQuestion({ closeForm }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const store = useSelector((state) => state?.test.questions);

  const { questionId } = router.query;
  const currentQuestionData = store?.find((question) => question.id === Number(questionId));

  const [openSaveConfirmation, setOpenSaveConfirmation] = useState(false);

  const closeModal = () => {
    if (openSaveConfirmation) setOpenSaveConfirmation(false);
  };

  const onSubmit = async (values) => {
    if (questionId) {
      await fetch(`https://interns-test-fe.snp.agency/api/v1/questions/${questionId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
        },
        body: JSON.stringify(values),
      });
    }

    if (!questionId) {
      dispatch(addUnsavedQuestion({ values }));
    }

    closeForm();
  };

  const formik = useFormik({
    enableReinitialize: true, initialValues: { title: currentQuestionData?.title || '', answer: currentQuestionData?.answer || '', question_type: 'number' }, onSubmit, validationSchema,
  });

  const saveConfirmation = async () => {
    formik.setTouched({
      title: true,
      answer: true,
    });
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

  useModal(openSaveConfirmation);

  return (
    <div className={s.root}>
      <div className={s.headerContainer}>
        <p className={s.header}>Number</p>
      </div>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        { openSaveConfirmation && (
        <Confirmation header="Do you want to save your question?" onClick={formik.handleSubmit} closeConfirmation={closeModal} type="button" />
        )}
        {inputFields}
        <ActionButtons closeForm={closeForm} saveConfirmation={saveConfirmation} typeSave="button" />
      </form>
    </div>
  );
}

NumberAnswerQuestion.propTypes = {
  closeForm: func,
};
