'use client';

import { useFormik } from 'formik';
import { useState } from 'react';

import validationSchema from '@/utils/validation/OneAnswerValidation';

import InputField from '../InputField';
import Button from '../Button';
import CheckboxInput from '../CheckboxInput';

import s from './OneAnswerQuestion.module.scss';

export default function OneAnswerQuestion() {
  const [fields, setFields] = useState([
    { answer: '', checked: false },
    { answer: '', checked: false },
  ]);

  const addField = () => {
    setFields(fields.push({ answer: '', checked: false }));
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newFields = [...fields];
    newFields[index][name] = value;
    setFields(newFields);
  };

  const handleCheckboxChange = (index) => {
    const newFields = [...fields];
    newFields[index].checked = !newFields[index].checked;
    setFields(newFields);
  };

  const onSubmit = async (values, actions) => {
    const isValid = validationSchema.isValid(values);
    if (isValid) {
      fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
    }

    actions.setSubmitting(false);
  };

  // const formik = useFormik({ initialValues: { title: '', answers: [{ text: '', checkbox: false }, { text: '', checkbox: false }], question_type: 'number' }, onSubmit, validationSchema });
  const formik = useFormik({
    initialValues: {
      title: '', answers: ['', ''], checkboxes: [false, false], question_type: 'number',
    },
    onSubmit,
    validationSchema,
  });

  console.log(formik.values);

  // const inputFields = Array.from({ length: numberOfInputs }, (_, index) => (
  //   <div key={index}>
  //     <CheckboxInput name={`checkboxes[${index}]`} checked={field.checked} onChange={() => handleCheckboxChange(index)} />
  //     <InputField
  //       key={index}
  //       type="text"
  //       name={`answers[${index}]`}
  //       additionalClass={s.answerInput}
  //       value={formik.values.answers[index] || ''}
  //       onChange={formik.handleChange}
  //       textarea
  //     />
  //   </div>
  // ));

  const inputs = fields.map((item, i) => (
    <div key={i}>
      <CheckboxInput name={`checkboxes[${i}]`} value={formik.values.answers[i].checkbox} checked={item.checked} onChange={formik.handleChange} />
      <InputField
        // key={i}
        type="text"
        name={`answers[${i}]`}
        additionalClass={s.answerInput}
        value={formik.values.answers[i].text || ''}
        onChange={formik.handleChange}
        textarea
      />
    </div>
  ));

  const a = formik.values.answers.map((field, index) => (
    <div key={index}>
      <CheckboxInput
        name={`checkbox[${index}]`}
        value={field.checkbox}
        onChange={formik.handleChange}
      />
      <InputField
        type="text"
        name={`answers[${index}].text`}
        checked={field.checked}
        onChange={formik.handleChange}
      />
    </div>
  ));

  return (
    <div className={s.root}>
      <form className={s.form}>
        <InputField
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          inputFieldName="Enter your question"
          maxLength="100"
          additionalClass={s.questionInput}
          textarea
        />
        <div className={s.answersContainer}>
          {/* {a} */}
          <div className={s.answerBlock}>
            <CheckboxInput
              name={`checkboxes[${0}]`}
              id={`checkboxes[${0}]`}
              onChange={formik.handleChange}
              checked={formik.values.checkboxes[0]}
              additionalClass={s.checkboxStyles}
            />
            <InputField
              type="text"
              name={`answers[${0}]`}
              value={formik.values.answers[0]}
              onChange={formik.handleChange}
              additionalClass={s.answerInput}
              textarea
            />
          </div>
          <div className={s.answerBlock}>
            <CheckboxInput
              name={`checkboxes[${1}]`}
              id={`checkboxes[${1}]`}
              onChange={formik.handleChange}
              checked={formik.values.checkboxes[1]}
              additionalClass={s.checkboxStyles}
            />
            <InputField
              type="text"
              name={`answers[${1}].text`}
              value={formik.values.answers[1].text}
              onChange={formik.handleChange}
              additionalClass={s.answerInput}
              textarea
            />
          </div>
        </div>
        <div>
          <Button type="button" onClick={addField}>Add answer</Button>
        </div>
      </form>
    </div>
  );
}
