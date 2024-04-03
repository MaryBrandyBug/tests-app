import SignInForm from '../../commons/SignInForm';

import s from './HomePage.module.scss';
import { yeseva } from '@/styles/fonts';

export default function HomePage() {
  return (
    <main className={s.root}>
      <div className={s.header}>
        <p className={`${s.logo} ${yeseva.className}`}>My tests</p>
      </div>
      <div className={s.container}>
        <SignInForm />
      </div>
    </main>
  );
}
