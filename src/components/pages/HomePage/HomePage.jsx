import SignUpForm from '../../commons/SignUpForm/SignUpForm';
import s from './HomePage.module.scss';

export default function HomePage() {
  return (
    <main className={s.root}>
      <div className={s.header}>
        <p className={s.logo}>My tests</p>
      </div>
      <div className={s.container}>
        <SignUpForm />
      </div>
    </main>
  );
}
