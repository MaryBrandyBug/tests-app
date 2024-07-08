'use client';

import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { deleteQuestion } from '@/redux/store/slicer/testSlicer';

import InputField from '@/components/commons/InputField';
import Dropdown from '@/components/commons/Dropdown';
import NumberAnswerQuestion from '@/components/commons/NumberAnswerQuestion';
import OneAnswerQuestion from '@/components/commons/OneAnswerQuestion';
import MultiAnswerQuestion from '@/components/commons/MultiAnswerQuestion';
import SideMenu from '@/components/commons/SideMenu';
import Confirmation from '@/components/commons/Confirmation';
import Button from '@/components/commons/Button';

import s from './OnePageTest.module.scss';
import { manjari } from '@/styles/fonts';

export default function OneTestPage() {
  const [openDeleteTestConfirm, setOpenDeleteTestConfirm] = useState(false);
  const [openNumberAnswerForm, setOpenNumberAnswerForm] = useState(false);
  const [openOneAnswerForm, setOpenOneAnswerForm] = useState(false);
  const [openMultiAnswerForm, setOpenMultiAnswerForm] = useState(false);
  const [openDeleteQuestionConfirm, setOpenDeleteQuestionConfirm] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);
  const [currentQuestionCreation, setCurrentQuestionCreation] = useState('');

  const dispatch = useDispatch();
  const testTitle = useSelector((store) => store.test.title);

  const router = useRouter();
  const { id } = router.query;

  const openConfirmation = (itemId) => {
    setItemToDeleteId(itemId);
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
      pathname: router.pathname,
      query: { ...router.query, type: 'number' },
    }, undefined, { shallow: true });
  };

  const showOneAnswerForm = () => {
    setOpenOneAnswerForm(true);
    setOpenNumberAnswerForm(false);
    setOpenMultiAnswerForm(false);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, type: 'single' },
    }, undefined, { shallow: true });
  };

  const showMultiAnswerForm = () => {
    setOpenMultiAnswerForm(true);
    setOpenNumberAnswerForm(false);
    setOpenOneAnswerForm(false);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, type: 'multiple' },
    }, undefined, { shallow: true });
  };

  const closeQuestionForm = () => {
    setOpenMultiAnswerForm(false);
    setOpenNumberAnswerForm(false);
    setOpenOneAnswerForm(false);
  };

  useEffect(() => {
    if (router.isReady && router.query.type !== '') {
      setCurrentQuestionCreation(router.query?.type);

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

  const removeQuestion = async () => {
    fetch(`https://interns-test-fe.snp.agency/api/v1/questions/${itemToDeleteId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
      },
    })
      .then((res) => res.json())
      .then(() => dispatch(deleteQuestion(itemToDeleteId)));

    setOpenDeleteQuestionConfirm(false);
  };

  return (
    <div className={s.root}>
      { openDeleteTestConfirm && (
        <Confirmation header="Are you sure you want to delete this test?" onSubmit={removeTest} onClick={closeConfirmation} closeConfirmation={closeConfirmation} />
      )}
      {openDeleteQuestionConfirm && <Confirmation header="Are you sure you want to delete the question?" onClick={closeConfirmation} onSubmit={removeQuestion} closeConfirmation={closeConfirmation} />}
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
        <div className={s.questionsCreationArea}>
          {currentQuestionCreation === 'number' && openNumberAnswerForm && (<NumberAnswerQuestion id={id} closeForm={closeQuestionForm} />)}
          {currentQuestionCreation === 'single' && openOneAnswerForm && (<OneAnswerQuestion id={id} closeForm={closeQuestionForm} />)}
          {currentQuestionCreation === 'multiple' && openMultiAnswerForm && (<MultiAnswerQuestion id={id} closeForm={closeQuestionForm} />)}
        </div>
      </div>
    </div>
  );
}

OneTestPage.propTypes = {
  // additionalClass: string,
};
