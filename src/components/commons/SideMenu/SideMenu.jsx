'use client';

import { useEffect } from 'react';
import { func, string } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';

import stringLengthCheck from '@/utils/stringLengthCheck';
import { getTest } from '@/redux/store/slicer/testSlicer';

import Button from '../Button';

import s from './SideMenu.module.scss';

export default function SideMenu({ id, openConfirmation }) {
  const dispatch = useDispatch();

  const test = useSelector((store) => store.test);

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

  const questionList = questions?.map((item, i) => {
    const handleDelete = () => {
      openConfirmation(item.id);
    };

    return (
      <div key={item.id} className={s.questionContainer}>
        <div className={s.counterContainer}>
          <p>{i + 1}</p>
        </div>
        <p className={s.title}>{stringLengthCheck(item.title, 45)}</p>
        <div className={s.buttonsContainer}>
          <Button className={s.questionBtn} onClick={handleDelete}><Image src="/rubbishBin.svg" alt="remove question" width={30} height={30} /></Button>
          <Button className={s.questionBtn}><Image src="/pencil.svg" alt="update question" width={30} height={30} /></Button>
        </div>
      </div>
    );
  });

  return (
    <div className={s.root}>
      <h2 className={s.rootHeader}>Content</h2>
      <div className={s.content}>
        {questionList}
      </div>
    </div>
  );
}

SideMenu.propTypes = {
  id: string,
  openConfirmation: func,
};
