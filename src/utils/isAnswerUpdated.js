export default function isAnswerUpdated(oldAnswer, newAnswer) {
  return oldAnswer.text !== newAnswer.text || oldAnswer.is_right !== newAnswer.is_right;
}
