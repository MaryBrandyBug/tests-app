'use client';

import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { func, string } from 'prop-types';
import { useRouter } from 'next/router';

import validationSchema from '@/utils/validation/NumberAnswerQuestionValidation';
import data from './data';
import { addQuestion } from '@/redux/store/slicer/unsavedQuestionsSlicer';

import Confirmation from '../Confirmation';
import InputField from '../InputField';
import ActionButtons from '../ActionButtons';
import ErrorMessage from '../ErrorMessage';

import s from './NumberAnswerQuestion.module.scss';

export default function NumberAnswerQuestion({ id, closeForm, question_id }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [openSaveConfirmation, setOpenSaveConfirmation] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [questionForUpdate, setQuestionForUpdate] = useState(null);

  const store = useSelector((state) => state);

  useEffect(() => {
    // const savedQuestionsItem = store.test.questions?.filter((item) => /* Number(item.id) === Number(question_id) */ console.log(item));
    // const unsavedQuestions = store.newQuestions.find((test) => test[id]);
    // const unsavedQuestionsItem = unsavedQuestions[id].find((item) => item.id === question_id);
    // console.log(store.test.questions, savedQuestionsItem, 1);
    // if (test[id]) {
    //   // console.log(test[id].filter((c) => console.log(c.id === question_id)));

    //   return test[id].find((i) => i.id === question_id);
    // }

    // return '';
    // });
    // const question = store.test.questions?.find((item) => item.id === question_id)
    // || store.newQuestions.find((test) => {
    //   if (test[id]) {
    //     return test[id].filter((i) => i.id === question_id);
    //   }

    //   return '';
    // });

    // console.log(b, 'newquest');
  }, [router.isReady]);

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

  const formik = useFormik({ initialValues: { title: '', answer: '', question_type: 'number' }, onSubmit, validationSchema });

  const saveConfirmation = async () => {
    const isValid = await validationSchema.isValid(formik.values);
    if (isValid) {
      setOpenSaveConfirmation(true);
    }
  };

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
};
