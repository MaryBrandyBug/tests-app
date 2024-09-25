'use client';

import { useFormik } from 'formik';
import { useState } from 'react';
import { func, string } from 'prop-types';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import validationSchema from '@/utils/validation/MultiAnswerQuestionValidation';
import { addQuestion } from '@/redux/store/slicer/unsavedQuestionsSlicer';

import InputField from '../InputField';
import CheckboxInput from '../CheckboxInput';
import TextAnswerCreationForm from '../TextAnswerCreationForm';
import ErrorMessage from '../ErrorMessage';

import s from './MultiAnswerQuestion.module.scss';

export default function MultiAnswerQuestion({ id, closeForm, data }) {
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
    // setOpenSaveConfirmation(true);
    // const isValid = validationSchema.isValid(values);
    // if (isValid) {
    //   fetch(`https://interns-test-fe.snp.agency/api/v1/tests/${Number(id)}/questions`, {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
    //     },
    //     body: JSON.stringify(values),
    //   })
    //     .then((res) => res.json())
    //     .then((res) => dispatch(addQuestion(res)));
    // }

    // closeModal();
    // closeForm();
    // actions.setSubmitting(false);
    if (data?.id) {
      console.log(1);
    }
    dispatch(addQuestion({ values, id }));

    router.push(`/test/${id}`);
  };

  const formik = useFormik({
    initialValues: {
      title: data?.title || '',
      question_type: 'multiple',
      answers: data?.answers || [
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
        textarea
        onBlur={formik.handleBlur}
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

MultiAnswerQuestion.propTypes = {
  id: string,
  closeForm: func,
};
