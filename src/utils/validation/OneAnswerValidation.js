import * as yup from 'yup';

export default yup.object().shape({
  title: yup.string()
    .trim()
    .matches(/\S/, "The string can't contain only whitespaces")
    .required('Required to be filled'),
  answers: yup.array()
    .test('only-one-correct-answer', 'Only one answer can be correct!', (answers) => {
      const correctAnswers = answers.filter((answer) => answer.is_right);
      return correctAnswers.length <= 1;
    })
    .of(
      yup.object().shape({
        text: yup.string().required('Answer text is required'),
        is_right: yup.bool(),
      }),
    )
    .test('one-correct-answer', 'Please, mark correct answer!', (answers) => {
      const correctAnswers = answers.filter((answer) => answer.is_right || !answer.text);
      return correctAnswers.length > 0;
    }),
});
