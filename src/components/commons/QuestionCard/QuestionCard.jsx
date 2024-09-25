'use client';

import { useState } from 'react';
import { array, number, string } from 'prop-types';

import InputField from '../InputField';
import CheckboxInput from '../CheckboxInput';

import s from './QuestionCard.module.scss';

export default function QuestionCard({
  title, type, answer, answers,
}) {
  const [checked, setChecked] = useState({});

  const renderAnswerOptions = () => {
    const handleChange = (id) => {
      setChecked((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
    };

    if (type === 'multiple') {
      const answerChoice = answers.map((item) => {
        const onChange = () => {
          handleChange(item.id);
        };
        return (
          <div className={s.answerContainer} key={item.id}>
            <CheckboxInput name={`answer${item.id}`} id={`${item.id}`} additionalClassInput={s.checkboxInput} checked={checked[item.id] || false} onChange={onChange} />
            <p>{item.text}</p>
          </div>
        );
      });

      return answerChoice;
    }

    return '';
  };

  const answerChoices = renderAnswerOptions();

  return (
    <div className={s.root}>
      <p className={s.title}>{title}</p>
      <div className={s.answersContainer}>
        {answer && <InputField type="number" name="number_answer" placeholder="Enter a numeric answer" additionalClass={s.inputNumber} />}
        {answerChoices}
      </div>
    </div>
  );
}

QuestionCard.propTypes = {
  title: string,
  type: string,
  answer: number,
  answers: array,
};
