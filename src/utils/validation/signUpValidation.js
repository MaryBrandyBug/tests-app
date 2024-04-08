import * as yup from 'yup';

export default yup.object().shape({
  username: yup.string()
    .matches(/\S/, "The string can't contain only whitespaces")
    .matches(/^[a-zA-Z0-9]+$/, 'Only letters and numbers are allowed !')
    .required('Required to be filled !'),
  password: yup.string()
    .matches(/\S/, "The string can't contain only whitespaces")
    .min(6, 'The password must contain at least 6 characters').matches(/^[a-zA-Z0-9]+$/, 'Only letters and numbers are allowed !')
    .required('Required to be filled !'),
  password_confirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match !')
    .required('Required to be filled !'),
});
