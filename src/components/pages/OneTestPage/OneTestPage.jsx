'use client';

import { useFormik } from 'formik';

import InputField from '@/components/commons/InputField';
import Dropdown from '@/components/commons/Dropdown';

import s from './OnePageTest.module.scss';
import { manjari } from '@/styles/fonts';

export default function OneTestPage() {
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
          <Dropdown text="New question" contentList={[{ questionType: 'One Answer', key: '1' }, { questionType: 'Multiple Answer', key: '2' }, { questionType: 'Number', key: '3' }]} additionalClassContent={s.dropdownContent} additionalClassText={s.dropdownText} additionalClassRoot={s.dropdownContainer} />
        </div>
      </div>
    </div>
  );
}

OneTestPage.propTypes = {
  // additionalClass: string,
};
