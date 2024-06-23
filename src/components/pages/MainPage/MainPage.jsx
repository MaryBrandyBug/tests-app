'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUser, deleteUser } from '@/redux/store/slicer/userSlicer';
import { getTest } from '@/redux/store/slicer/testSlicer';

import Button from '@/components/commons/Button';
import Logo from '@/components/commons/Logo';
import Modal from '@/components/commons/Modal';
import AddTestForm from '@/components/commons/AddTestForm';
import TestCard from '@/components/commons/TestCard';

import s from './MainPage.module.scss';
import { yeseva } from '@/styles/fonts';

export default function MainPage() {
  const [openTestAdding, setTestAdding] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const tests = useSelector((state) => state.test);

  const testAdding = () => {
    setTestAdding(true);
  };

  const closeModal = () => {
    if (openTestAdding) setTestAdding(false);
  };

  useEffect(() => {
    fetch('https://interns-test-fe.snp.agency/api/v1/users/current', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
      },
    })
      .then((res) => res.json())
      .then((data) => data.id && dispatch(getUser(data)));

    fetch('https://interns-test-fe.snp.agency/api/v1/tests', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
      },
    })
      .then((res) => res.json())
      .then((data) => dispatch(getTest(data.tests)));
  }, []);

  const handleLogout = async () => {
    fetch('https://interns-test-fe.snp.agency/api/v1/logout', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
      },
    })
      .then((res) => res.json())
      .then(() => dispatch(deleteUser()));
  };

  const testLibrary = tests.length && tests.map((test, i) => <TestCard key={i} title={test.title} is_admin={user.is_admin} questionNumber={test.questions.length} id={test.id} />);

  return (
    <div className={s.root}>
      <div className={s.header}>
        <Logo />
        { user.id ? (
          <div className={s.logoutLinkContainer}>
            <Button onClick={handleLogout} className={`${s.signInLink} ${yeseva.className}`}>Log out</Button>
          </div>
        )
          : (
            <div className={s.authLinkContainer}>
              <Button href="/signin" className={`${s.signInLink} ${yeseva.className}`}>Sign In</Button>
            </div>
          )}
      </div>
      {openTestAdding && (
        <Modal header="New test" cancelation onClick={closeModal}>
          <AddTestForm />
        </Modal>
      )}
      {user.is_admin && (
        <div className={s.addTestLinkContainer}>
          <Button onClick={testAdding} className={`${s.addTestLink} ${yeseva.className}`}>Add test</Button>
        </div>
      )}
      <div className={s.content}>
        <div className={s.container}>
          {testLibrary}
        </div>
      </div>
    </div>
  );
}
