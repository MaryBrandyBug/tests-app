import HomePage from '../components/pages/HomePage';
import SignUpForm from '../components/commons/SignUpForm';

export default function page() {
  return (
    <HomePage Form={SignUpForm} />
  );
}
