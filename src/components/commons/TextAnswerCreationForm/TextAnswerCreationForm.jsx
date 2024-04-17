'use client';

import {
  any, bool, func, object, string,
} from 'prop-types';

import Confirmation from '../Confirmation';
import InputField from '../InputField';
import Button from '../Button';
import ActionButtons from '../ActionButtons';
import ErrorMessage from '../ErrorMessage';

import s from './TextAnswerCreationForm.module.scss';

export default function TextAnswerCreationForm({
  openSaveConfirmation, closeModal, addField, deleteConfirmation, children, name, value, onChange, onSubmit, formik,
}) {
  return (
    <form className={s.root} onSubmit={onSubmit}>
      { openSaveConfirmation && (
        <Confirmation header="Do you want to save your question?" onClick={closeModal} />
      )}
      <InputField
        name={name}
        value={value}
        onChange={onChange}
        inputFieldName="Enter your question"
        maxLength="100"
        additionalClass={s.questionInput}
        textarea
      >
        {formik.errors[name] && <ErrorMessage valueKey={name} formik={formik} />}
      </InputField>
      <div className={s.answersContainer}>
        {children}
      </div>
      <div className={s.addFieldBtnContainer}>
        <Button type="button" className={s.addFieldBtn} onClick={addField}>Add answer</Button>
      </div>
      <ActionButtons deleteConfirmation={deleteConfirmation} />
    </form>
  );
}

TextAnswerCreationForm.propTypes = {
  openSaveConfirmation: bool,
  closeModal: func,
  addField: func,
  deleteConfirmation: func,
  children: any,
  name: string,
  value: string,
  onChange: func,
  onSubmit: func,
  formik: object,
};
