import AuthPage from '../components/pages/AuthPage';
import SignInForm from '../components/commons/SignInForm';

export default function page() {
  return (
    <AuthPage Form={SignInForm} />
  );
}
