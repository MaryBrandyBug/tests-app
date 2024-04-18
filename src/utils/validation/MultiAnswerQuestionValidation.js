import * as yup from 'yup';

export default yup.object().shape({
  title: yup.string()
    .trim()
    .matches(/\S/, "The string can't contain only whitespaces")
    .required('Required to be filled'),
  answers: yup.array()
    .test('at-least-two-correct-answers', 'At least two answers must be correct!', (answers) => {
      const correctAnswers = answers.filter((answer) => answer.is_right);
      return correctAnswers.length >= 2;
    })
    .of(
      yup.object().shape({
        text: yup.string()
          .matches(/\S/, "The string can't contain only whitespaces")
          .required('Answer text is required'),
        is_right: yup.bool(),
      }),
    ),
});
