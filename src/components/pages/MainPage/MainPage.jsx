'use client';

import Button from '@/components/commons/Button';
import Logo from '@/components/commons/Logo';

import s from './MainPage.module.scss';
import { yeseva } from '@/styles/fonts';

export default function MainPage() {
  return (
    <div className={s.root}>
      <div className={s.header}>
        <Logo />
        <div className={s.authLinkContainer}>
          <Button href="/signin" className={`${s.signInLink} ${yeseva.className}`}>Sign In</Button>
        </div>
      </div>
    </div>
  );
}
