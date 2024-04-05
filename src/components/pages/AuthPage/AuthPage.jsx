import { func } from 'prop-types';

import Logo from '@/components/commons/Logo';

import s from './AuthPage.module.scss';

export default function HomePage({ Form }) {
  return (
    <main className={s.root}>
      <Logo additionalClass={s.logo} />
      <div className={s.container}>
        <Form />
      </div>
    </main>
  );
}

HomePage.propTypes = {
  Form: func.isRequired,
};
