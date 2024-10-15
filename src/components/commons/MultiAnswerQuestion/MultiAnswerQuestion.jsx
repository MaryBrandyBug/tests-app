'use client';

import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { func } from 'prop-types';
import Image from 'next/image';

import validationSchema from '@/utils/validation/MultiAnswerQuestionValidation';
import { addUnsavedQuestion } from '@/redux/store/slicer/unsavedQuestionsSlicer';
import useModal from '@/hooks/useModal';
import isAnswerUpdated from '@/utils/isAnswerUpdated';

import InputField from '../InputField';
import CheckboxInput from '../CheckboxInput';
import TextAnswerCreationForm from '../TextAnswerCreationForm';
import ErrorMessage from '../ErrorMessage';
import Button from '../Button';

import s from './MultiAnswerQuestion.module.scss';

export default function MultiAnswerQuestion({ closeForm }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const store = useSelector((state) => state?.test.questions);

  const [openSaveConfirmation, setOpenSaveConfirmation] = useState(false);

  const { questionId, id } = router.query;
  const currentQuestionData = store?.find((question) => question.id === Number(questionId));

  const closeModal = () => {
    if (openSaveConfirmation) setOpenSaveConfirmation(false);
  };

  const onSubmit = async (values) => {
    if (questionId) {
      const { title, answers } = currentQuestionData;

      if (values.title !== title) {
        const dataToSend = {
          title: values.title,
          question_type: values.question_type,
        };

        fetch(`https://interns-test-fe.snp.agency/api/v1/questions/${questionId}`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
          },
          body: JSON.stringify(dataToSend),
        });
      }

      values.answers.forEach((item) => {
        const answerId = item.id;
        const oldAnswer = answers.find((answer) => answer.id === answerId) || '';

        if (oldAnswer) { // проверяем существует ли данный вариант ответа в БД
          const updatesCheck = isAnswerUpdated(oldAnswer, item); // проверяем есть ли изменения в текущем варианте ответа

          if (updatesCheck) { // если изменения есть, отправляем их в БД
            fetch(`https://interns-test-fe.snp.agency/api/v1/answers/${answerId}`, {
              method: 'PATCH',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
                'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
              },
              body: JSON.stringify(item),
            });
          }
        }

        if (!oldAnswer) { // если такой вариант ответа в БД отсутствует, создаем
          fetch(`https://interns-test-fe.snp.agency/api/v1/questions/${questionId}/answers`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
            },
            body: JSON.stringify(item),
          });
        }
      });
    }

    if (!questionId) {
      dispatch(addUnsavedQuestion({ values, id }));
    }

    closeForm();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: currentQuestionData?.title || '',
      question_type: 'multiple',
      answers: currentQuestionData?.answers || [
        { text: '', is_right: false },
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

  const inputs = formik.values.answers.map((item, i) => {
    const removeField = async () => {
      const newAnswers = formik.values.answers.filter((_, ind) => ind !== i); // создаем новый массив без элемента с указанным индексом
      formik.setFieldValue('answers', newAnswers);

      if (item.id) {
        fetch(`https://interns-test-fe.snp.agency/api/v1/answers/${item.id}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
          },
        });
      }
    };

    return (
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
        <Button type="button" className={s.closeBtn} onClick={removeField}><Image src="/close.svg" alt="close button" width={50} height={50} /></Button>
      </div>
    );
  });

  useModal(openSaveConfirmation);

  return (
    <div className={s.root}>
      <div className={s.headerContainer}>
        <p className={s.header}>Multiple choice</p>
      </div>
      <TextAnswerCreationForm
        openSaveConfirmation={openSaveConfirmation}
        closeModal={closeModal}
        addField={addField}
        closeForm={closeForm}
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
  closeForm: func,
};
