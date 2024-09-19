'use client';

import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { bool } from 'prop-types';

import { deleteQuestion } from '@/redux/store/slicer/testSlicer';
import { removeQuestion } from '@/redux/store/slicer/unsavedQuestionsSlicer';

import InputField from '@/components/commons/InputField';
import Dropdown from '@/components/commons/Dropdown';
import SideMenu from '@/components/commons/SideMenu';
import Confirmation from '@/components/commons/Confirmation';
import Button from '@/components/commons/Button';
import QuestionCreation from '@/components/commons/QuestionCreation';
import QuestionUpdate from '@/components/commons/QuestionUpdate';

import s from './OneTestPage.module.scss';
import { manjari } from '@/styles/fonts';

export default function OneTestPage({ isCreating, isEditing }) {
  const [openDeleteTestConfirm, setOpenDeleteTestConfirm] = useState(false); // модалка согласие юзера удалить тест
  const [openNumberAnswerForm, setOpenNumberAnswerForm] = useState(false); // форма вопроса с численным ответом
  const [openOneAnswerForm, setOpenOneAnswerForm] = useState(false); //
  const [openMultiAnswerForm, setOpenMultiAnswerForm] = useState(false); // форма вопроса с несколькими вариантами ответа
  const [openDeleteQuestionConfirm, setOpenDeleteQuestionConfirm] = useState(false); // модалка согласие юзера удалить уже созданный вопрос к тесту
  const [itemToDelete, setItemToDelete] = useState(null); // данные удаляемого вопроса к тесту
  const [questionTypeCreation, setQuestionTypeCreation] = useState(''); // какой тип вопроса мы создаем в данный момент

  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();

  const testTitle = useSelector((store) => store.test.title);

  const openConfirmation = (itemId, saved = false) => {
    setItemToDelete({ id: itemId, saved });
    setOpenDeleteQuestionConfirm(true);
  };

  const closeConfirmation = () => {
    if (openDeleteQuestionConfirm) {
      setOpenDeleteQuestionConfirm(false);
    }
    if (openDeleteTestConfirm) {
      setOpenDeleteTestConfirm(false);
    }
  };

  const deleteConfirmation = () => {
    setOpenDeleteTestConfirm(true);
  };

  const removeTest = async () => {
    fetch(`https://interns-test-fe.snp.agency/api/v1/tests/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
      },
    })
      .then((res) => res.json())
      .then((res) => { if (res.status === 'ok') { router.push('/'); } });
  };

  const showNumberAnswerForm = () => {
    setOpenNumberAnswerForm(true);
    setOpenOneAnswerForm(false);
    setOpenMultiAnswerForm(false);
    router.push({
      pathname: `/test/${id}/create`,
      query: { type: 'number' },
    }, undefined, { shallow: true });
  };

  const showOneAnswerForm = () => {
    setOpenOneAnswerForm(true);
    setOpenNumberAnswerForm(false);
    setOpenMultiAnswerForm(false);
    router.push({
      pathname: `/test/${id}/create`,
      query: { type: 'single' },
    }, undefined, { shallow: true });
  };

  const showMultiAnswerForm = () => {
    setOpenMultiAnswerForm(true);
    setOpenNumberAnswerForm(false);
    setOpenOneAnswerForm(false);
    router.push({
      pathname: `/test/${id}/create`,
      query: { type: 'multiple' },
    }, undefined, { shallow: true });
  };

  const closeQuestionForm = () => {
    setOpenMultiAnswerForm(false);
    setOpenNumberAnswerForm(false);
    setOpenOneAnswerForm(false);
  };

  useEffect(() => {
    if (router.isReady && router.query.type !== '') {
      setQuestionTypeCreation(router.query?.type);

      switch (router.query.type) {
        case 'number':
          setOpenNumberAnswerForm(true);
          break;
        case 'single':
          setOpenOneAnswerForm(true);
          break;
        case 'multiple':
          setOpenMultiAnswerForm(true);
          break;
        default:
          break;
      }
    }
  }, [router.query]);

  const formik = useFormik({ initialValues: { title: '' } });

  useEffect(() => {
    if (testTitle) {
      formik.setFieldValue('title', testTitle);
    }
  }, [testTitle]);

  const onRemoveQuestion = async () => {
    if (itemToDelete.saved) {
      // fetch(`https://interns-test-fe.snp.agency/api/v1/questions/${itemToDelete.id}`, {
      //   method: 'DELETE',
      //   credentials: 'include',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
      //   },
      // })
      //   .then((res) => res.json())
      //   .then(() => dispatch(deleteQuestion(itemToDelete.id)));
      dispatch({ type: 'test/deleteQuestion', id, questionId: itemToDelete.id });

      setOpenDeleteQuestionConfirm(false);
    }

    dispatch(removeQuestion(itemToDelete.id));
    setOpenDeleteQuestionConfirm(false);
  };

  return (
    <div className={s.root}>
      { openDeleteTestConfirm && (
        <Confirmation header="Are you sure you want to delete this test?" onSubmit={removeTest} onClick={closeConfirmation} closeConfirmation={closeConfirmation} />
      )}
      {openDeleteQuestionConfirm && <Confirmation header="Are you sure you want to delete the question?" onClick={closeConfirmation} onSubmit={onRemoveQuestion} closeConfirmation={closeConfirmation} />}
      <div className={`${s.content} ${manjari.className}`}>
        <SideMenu id={id || null} openConfirmation={openConfirmation} />
        <div className={s.titleFormContainer}>
          <form className={s.titleForm} onSubmit={formik.handleSubmit}>
            <InputField type="text" name="title" value={formik.values.title} onChange={formik.handleChange} placeholder="Name your test" maxLength="50" additionalClass={s.testTitleInput} />
          </form>
          <Button className={s.deleteTestBtn} onClick={deleteConfirmation}>Delete test</Button>
        </div>
        <div className={s.dropdownMenu}>
          <Dropdown text="New question" contentList={[{ questionType: 'One Answer', key: '1', onClick: showOneAnswerForm }, { questionType: 'Multiple Answer', key: '2', onClick: showMultiAnswerForm }, { questionType: 'Number', key: '3', onClick: showNumberAnswerForm }]} additionalClassContent={s.dropdownContent} additionalClassText={s.dropdownText} additionalClassRoot={s.dropdownContainer} />
        </div>
        {isCreating
          && <QuestionCreation currentQuestionCreation={questionTypeCreation} questionFormType={openNumberAnswerForm || openOneAnswerForm || openMultiAnswerForm} id={id} handleClose={closeQuestionForm} />}
        {isEditing
          && <QuestionUpdate currentQuestionUpdate={questionTypeCreation} id={id} handleClose={closeQuestionForm} />}
      </div>
    </div>
  );
}

OneTestPage.propTypes = {
  isCreating: bool,
  isEditing: bool,
};
