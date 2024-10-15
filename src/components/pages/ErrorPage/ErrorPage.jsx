'use client';

import Button from '@/components/commons/Button';

import s from './ErrorPage.module.scss';

export default function ErrorPage() {
  return (
    <div className={s.root}>
      <p>An error has occurred</p>
      <p>
        <Button href="/">Back to main</Button>
      </p>
    </div>
  );
}
