'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { getUser } from '@/redux/store/slicer/userSlicer';
import { getAllTests } from '@/redux/store/slicer/librarySlicer';
import useModal from '@/hooks/useModal';

import Button from '@/components/commons/Button';
import Modal from '@/components/commons/Modal';
import AddTestForm from '@/components/commons/AddTestForm';
import TestLibrary from '@/components/commons/TestLibrary';
import Confirmation from '@/components/commons/Confirmation';

import s from './MainPage.module.scss';
import { yeseva } from '@/styles/fonts';

export default function MainPage() {
  const [openTestAdding, setTestAdding] = useState(false);
  const [testStartConfirmModal, setTestStartConfirmModal] = useState(false);
  const [testRunId, setTestRunId] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user);
  const tests = useSelector((state) => state.library);

  const testAdding = () => {
    setTestAdding(true);
  };

  const testStarting = (testId) => {
    setTestStartConfirmModal(true);
    setTestRunId(testId);
  };

  const closeModal = () => {
    if (openTestAdding) setTestAdding(false);
    if (testStartConfirmModal) setTestStartConfirmModal(false);
  };

  const goToTest = () => {
    router.push(`/test/${testRunId}/run`);
  };

  useEffect(() => {
    if (user.username) {
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
        .then((data) => dispatch(getAllTests(data)));
    }
    if (!user.username) {
      router.push('/signin');
    }
  }, [user.username]);

  useModal(openTestAdding || testStartConfirmModal);

  return (
    <div className={s.root}>
      {openTestAdding && (
        <Modal header="New test" cancelation onClick={closeModal}>
          <AddTestForm />
        </Modal>
      )}
      {testStartConfirmModal && (
        <Confirmation header="Do you want to start the test?" closeConfirmation={closeModal} onClick={goToTest} />
      )}
      {user.is_admin && (
        <div className={s.addTestLinkContainer}>
          <Button onClick={testAdding} className={`${s.addTestLink} ${yeseva.className}`}>Add test</Button>
        </div>
      )}
      <div className={s.libraryContainer}>
        {user.username && <TestLibrary tests={tests} is_admin={user.is_admin} onTestStarting={testStarting} />}
      </div>
    </div>
  );
}
