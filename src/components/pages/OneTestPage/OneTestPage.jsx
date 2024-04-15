'use client';

import { useFormik } from 'formik';
import { useState } from 'react';

import InputField from '@/components/commons/InputField';
import Dropdown from '@/components/commons/Dropdown';
import NumberAnswerQuestion from '@/components/commons/NumberAnswerQuestion';
import OneAnswerQuestion from '@/components/commons/OneAnswerQuestion';
import MultiAnswerQuestion from '@/components/commons/MultiAnswerQuestion';

import s from './OnePageTest.module.scss';
import { manjari } from '@/styles/fonts';

export default function OneTestPage() {
  const [openNumberAnswerForm, setOpenNumberAnswerForm] = useState(false);
  const [openOneAnswerForm, setOpenOneAnswerForm] = useState(false);
  const [openMultiAnswerForm, setOpenMultiAnswerForm] = useState(false);

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

  const formik = useFormik({ initialValues: { title: '' } });

  return (
    <div className={s.root}>
      <div className={`${s.content} ${manjari.className}`}>
        <div className={s.titleFormContainer}>
          <form className={s.titleForm}>
            <InputField type="text" name="title" value={formik.values.title} onChange={formik.handleChange} placeholder="Name your test" maxLength="50" additionalClass={s.testTitleInput} />
          </form>
        </div>
        <div className={s.dropdownMenu}>
          <Dropdown text="New question" contentList={[{ questionType: 'One Answer', key: '1', onClick: showOneAnswerForm }, { questionType: 'Multiple Answer', key: '2', onClick: showMultiAnswerForm }, { questionType: 'Number', key: '3', onClick: showNumberAnswerForm }]} additionalClassContent={s.dropdownContent} additionalClassText={s.dropdownText} additionalClassRoot={s.dropdownContainer} />
        </div>
        <div className={s.questionsCreationArea}>
          {openNumberAnswerForm && (<NumberAnswerQuestion />)}
          {openOneAnswerForm && (<OneAnswerQuestion />)}
          {openMultiAnswerForm && (<MultiAnswerQuestion />)}
        </div>
      </div>
    </div>
  );
}

OneTestPage.propTypes = {
  // additionalClass: string,
};
