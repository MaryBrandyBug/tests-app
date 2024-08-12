'use client';

import { useEffect, useState } from 'react';
import { func, string } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import cx from 'classnames';

import stringLengthCheck from '@/utils/stringLengthCheck';
import { getTest } from '@/redux/store/slicer/testSlicer';

import Button from '../Button';

import s from './SideMenu.module.scss';

export default function SideMenu({ id, openConfirmation }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [unsavedQuestions, setUnsavedQuestions] = useState(null);

  const test = useSelector((store) => store.test);
  const newQuestions = useSelector((store) => store.newQuestions);
  const allUnsavedQuestions = useSelector((store) => store.newQuestions); // получаем список ВСЕХ несохраненных вопросов ко ВСЕМ тестам
  const currentTestNewData = allUnsavedQuestions.find((i) => id in i); // получаем объект со свойством (id) и значением - массивом несохраненных вопросов к ТЕКУЩЕМУ тесту, если этот список существует

  useEffect(() => {
    if (router.isReady && currentTestNewData) {
      const newDataList = currentTestNewData[id]; // получаем список несохраненных вопросов к ТЕКУЩЕМУ тесту
      setUnsavedQuestions(newDataList); // и записываем в стейт
    }
  }, [currentTestNewData]);

  const { questions } = test;

  useEffect(() => {
    if (id) {
      fetch(`https://interns-test-fe.snp.agency/api/v1/tests/${Number(id)}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
        },
      })
        .then((res) => res.json())
        .then((data) => dispatch(getTest(data)));
    }
  }, [id]);

  const questionList = (arr, numeration = false) => arr?.map((item, i) => { // в аргументах помимо массива лежит булиевое значение numeration, принимающее значение true в том случае, если к списку нам нужна нумерация элементов
    const handleDelete = () => {
      openConfirmation(item.id);
    };

    return (
      <div key={item.id} className={s.questionContainer}>
        {numeration
        && (
        <div className={s.counterContainer}>
          <p>{i + 1}</p>
        </div>
        )}
        <p className={s.title}>{stringLengthCheck(item.title, 45)}</p>
        <div className={s.editButtonsContainer}>
          <Button className={s.questionBtn} onClick={handleDelete}><Image src="/rubbishBin.svg" alt="remove question" width={30} height={30} /></Button>
          <Button className={s.questionBtn}><Image src="/pencil.svg" alt="update question" width={30} height={30} /></Button>
        </div>
      </div>
    );
  });

  return (
    <div className={s.root}>
      <div className={s.createdQuestionsContainer}>
        <h2 className={s.header}>Test Questions</h2>
        <div className={s.content}>
          {questionList(questions, true)}
        </div>
      </div>
      <div className={cx(s.createdQuestionsContainer, { [s.newQuestionsContainer]: newQuestions })}>
        <h2 className={s.header}>New Questions</h2>
        <div className={s.content}>
          {questionList(unsavedQuestions)}
        </div>
        <div className={s.savingButtonsContainer}>
          <Button className={s.saveBtn}>Save</Button>
          <Button className={s.clearBtn}>Clear</Button>
        </div>
      </div>
    </div>
  );
}

SideMenu.propTypes = {
  id: string,
  openConfirmation: func,
};
