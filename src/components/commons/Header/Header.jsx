'use client';

import { useDispatch, useSelector } from 'react-redux';

import { deleteUser } from '@/redux/store/slicer/userSlicer';
import { selectUser } from '@/constants/selectors';

import Logo from '../Logo';
import Button from '../Button';

import s from './Header.module.scss';
import { yeseva } from '@/styles/fonts';

export default function Header() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

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
      <Logo />
      { user.id
        && (
        <div className={s.logoutLinkContainer}>
          <Button onClick={handleLogout} className={`${s.signInLink} ${yeseva.className}`}>Log out</Button>
        </div>
        )}
    </div>
  );
}
