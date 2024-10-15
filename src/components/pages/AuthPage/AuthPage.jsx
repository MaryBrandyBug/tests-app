import { func } from 'prop-types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import s from './AuthPage.module.scss';

export default function HomePage({ Form }) {
  const router = useRouter();
  const { user } = useSelector((state) => state);

  useEffect(() => {
    if (user.username) {
      router.push('/');
    }
  }, [user]);

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
