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

import s from './OnePageTest.module.scss';
import { manjari } from '@/styles/fonts';

export default function OneTestPage() {
  const [openNumberAnswerForm, setOpenNumberAnswerForm] = useState(false);
  const [openOneAnswerForm, setOpenOneAnswerForm] = useState(false);
  const [openMultiAnswerForm, setOpenMultiAnswerForm] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);

  const dispatch = useDispatch();
  const testTitle = useSelector((store) => store.test.title);

  const router = useRouter();
  const { id } = router.query;

  const openConfirmation = (itemId) => {
    setItemToDeleteId(itemId);
    setConfirmation(true);
  };

  const closeConfirmation = () => {
    setConfirmation(false);
  };

  const showNumberAnswerForm = () => {
    setOpenNumberAnswerForm(true);
    setOpenOneAnswerForm(false);
    setOpenMultiAnswerForm(false);
  };

  const showOneAnswerForm = () => {
    setOpenOneAnswerForm(true);
    setOpenNumberAnswerForm(false);
    setOpenMultiAnswerForm(false);
  };

  const showMultiAnswerForm = () => {
    setOpenMultiAnswerForm(true);
    setOpenNumberAnswerForm(false);
    setOpenOneAnswerForm(false);
  };

  const closeQuestionForm = () => {
    setOpenMultiAnswerForm(false);
    setOpenNumberAnswerForm(false);
    setOpenOneAnswerForm(false);
  };

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

    setConfirmation(false);
  };

  return (
    <div className={s.root}>
      {confirmation && <Confirmation header="Are you sure you want to delete the question?" onClick={closeConfirmation} onSubmit={removeQuestion} closeConfirmation={closeConfirmation} />}
      <div className={`${s.content} ${manjari.className}`}>
        <SideMenu id={id || null} openConfirmation={openConfirmation} />
        <div className={s.titleFormContainer}>
          <form className={s.titleForm} onSubmit={formik.handleSubmit}>
            <InputField type="text" name="title" value={formik.values.title} onChange={formik.handleChange} placeholder="Name your test" maxLength="50" additionalClass={s.testTitleInput} />
          </form>
        </div>
        <div className={s.dropdownMenu}>
          <Dropdown text="New question" contentList={[{ questionType: 'One Answer', key: '1', onClick: showOneAnswerForm }, { questionType: 'Multiple Answer', key: '2', onClick: showMultiAnswerForm }, { questionType: 'Number', key: '3', onClick: showNumberAnswerForm }]} additionalClassContent={s.dropdownContent} additionalClassText={s.dropdownText} additionalClassRoot={s.dropdownContainer} />
        </div>
        <div className={s.questionsCreationArea}>
          {openNumberAnswerForm && (<NumberAnswerQuestion id={id} closeForm={closeQuestionForm} />)}
          {openOneAnswerForm && (<OneAnswerQuestion id={id} closeForm={closeQuestionForm} />)}
          {openMultiAnswerForm && (<MultiAnswerQuestion id={id} closeForm={closeQuestionForm} />)}
        </div>
      </div>
    </div>
  );
}

OneTestPage.propTypes = {
  // additionalClass: string,
};
