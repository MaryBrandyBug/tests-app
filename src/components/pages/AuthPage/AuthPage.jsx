import { func } from 'prop-types';

import s from './AuthPage.module.scss';

export default function HomePage({ Form }) {
  return (
    <main className={s.root}>
      <div className={s.container}>
        <Form />
      </div>
    </main>
  );
}

HomePage.propTypes = {
  Form: func.isRequired,
};
