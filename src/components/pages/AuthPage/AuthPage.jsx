import { func } from 'prop-types';

import s from './AuthPage.module.scss';
import { yeseva } from '@/styles/fonts';

export default function HomePage({ Form }) {
  return (
    <main className={s.root}>
      <div className={s.header}>
        <p className={`${s.logo} ${yeseva.className}`}>My tests</p>
      </div>
      <div className={s.container}>
        <Form />
      </div>
    </main>
  );
}

HomePage.propTypes = {
  Form: func.isRequired,
};
