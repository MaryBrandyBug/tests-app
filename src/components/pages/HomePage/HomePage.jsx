import { poppins } from '@/styles/fonts';
import SignInForm from '../../commons/SignInForm/SignInForm';

import s from './HomePage.module.scss';

export default function HomePage() {
  return (
    <main className={s.root}>
      <div className={s.header}>
        <p className={`${s.logo} ${poppins.className}`}>My tests</p>
      </div>
      <div className={s.container}>
        <SignInForm />
      </div>
    </main>
  );
}
