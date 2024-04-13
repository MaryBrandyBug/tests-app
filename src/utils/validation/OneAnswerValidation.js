import * as yup from 'yup';

export default yup.object().shape({
  title: yup.string()
    .matches(/\S/, "The string can't contain only whitespaces")
    .required('Required to be filled !'),
});
