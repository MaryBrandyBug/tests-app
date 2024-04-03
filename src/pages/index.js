import HomePage from '../components/pages/HomePage';
import SignInForm from '../components/commons/SignInForm';

export default function Home() {
  return (
    <HomePage Form={SignInForm} />
  );
}
