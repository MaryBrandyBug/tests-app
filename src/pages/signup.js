import AuthPage from '../components/pages/AuthPage';
import SignUpForm from '../components/commons/SignUpForm';

export default function page() {
  return (
    <AuthPage Form={SignUpForm} />
  );
}
