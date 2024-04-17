import * as yup from 'yup';

export default yup.object().shape({
  title: yup.string()
    .trim()
    .matches(/\S/, "The string can't contain only whitespaces")
    .required('Required to be filled'),
  answers: yup.array().of(
    yup.object().shape({
      text: yup.string().required('Answer text is required'),
      // is_right: yup.boolean().oneOf([true], 'Only one answer can be correct'),
    }),
  ),
});
