'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUser, deleteUser } from '@/redux/store/slicer/userSlicer';

import Button from '@/components/commons/Button';
import Logo from '@/components/commons/Logo';

import s from './MainPage.module.scss';
import { yeseva } from '@/styles/fonts';

export default function MainPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
    </div>
  );
}
