'use client';

import { useFormik } from 'formik';
import { useState } from 'react';

import InputField from '@/components/commons/InputField';
import Dropdown from '@/components/commons/Dropdown';
import NumberAnswerQuestion from '@/components/commons/NumberAnswerQuestion';

import s from './OnePageTest.module.scss';
import { manjari } from '@/styles/fonts';

export default function OneTestPage() {
  const [openNumberAnswerForm, setOpenNumberAnswerForm] = useState(false);

  const showNumberAnswerForm = () => {
    setOpenNumberAnswerForm(true);
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
          <Dropdown text="New question" contentList={[{ questionType: 'One Answer', key: '1' }, { questionType: 'Multiple Answer', key: '2' }, { questionType: 'Number', key: '3', onClick: showNumberAnswerForm }]} additionalClassContent={s.dropdownContent} additionalClassText={s.dropdownText} additionalClassRoot={s.dropdownContainer} />
        </div>
        <div className={s.questionsCreationArea}>
          {openNumberAnswerForm && (<NumberAnswerQuestion />)}
        </div>
      </div>
    </div>
  );
}

OneTestPage.propTypes = {
  // additionalClass: string,
};
