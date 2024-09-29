'use client';

import { useEffect, useState } from 'react';
import {
  array, func, number, string,
} from 'prop-types';

import InputField from '../InputField';
import CheckboxInput from '../CheckboxInput';
import RadioInput from '../RadioInput';

import s from './QuestionCard.module.scss';

export default function QuestionCard({
  questionId, title, type, answer, answers, questionChange, handleAnswerChange,
}) {
  const [checked, setChecked] = useState({});
  const [radioChecked, setRadioChecked] = useState({});
  const [numberAnswer, setNumberAnswer] = useState('');

  const handleNumberInput = (e) => {
    setNumberAnswer(e.target.value);
    handleAnswerChange(questionId, e.target.value, type);
  };

  useEffect(() => {
    questionChange(questionId);
  }, [questionId]);

  useEffect(() => {
    handleAnswerChange(questionId, checked);
  }, [checked]);

  useEffect(() => {
    handleAnswerChange(questionId, radioChecked);
  }, [radioChecked]);

  const renderAnswerOptions = () => {
    const handleChange = (id) => {
      setChecked((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
    };

    const handleRadioChange = (id) => {
      setRadioChecked((prevState) => ({
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
            <CheckboxInput name={`/* answer */${item.id}`} id={`${item.id}`} additionalClassInput={s.checkboxInput} checked={checked[item.id] || false} onChange={onChange} />
            <p>{item.text}</p>
          </div>
        );
      });

      return answerChoice;
    }

    if (type === 'single') {
      const answerChoice = answers.map((item) => {
        const onChange = () => {
          handleRadioChange(item.id);
        };

        return (
          <RadioInput key={item.id} name={`question${questionId}`} id={`${item.id}`} text={item.text} additionalClassInput={s.checkboxInput} checked={radioChecked[item.id] || false} onChange={onChange} />
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
        {answer && <InputField type="number" value={numberAnswer} name={`answer${questionId}`} placeholder="Enter a numeric answer" additionalClass={s.inputNumber} onChange={handleNumberInput} />}
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
  questionId: number,
  questionChange: func,
};
