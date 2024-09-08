import { createSlice } from '@reduxjs/toolkit';
import uniqid from 'uniqid';

const initialState = [];

const unsavedQuestionsSlicer = createSlice({
  name: 'newQuestions',
  initialState,
  reducers: {
    addQuestion(state, { payload }) {
      const { id, values } = payload;
      values.id = uniqid();

      const unsavedQuestionsExisting = state.find((item) => id in item);
      if (unsavedQuestionsExisting) {
        unsavedQuestionsExisting[id].push(values);
      } else {
        state.push({ [id]: [values] });
      }
    },
    removeQuestion(state, { payload }) {
      const { questionId, testId } = payload;

      return state.map((item) => {
        if (item[testId]) {
          const updatedQuestions = item[testId].filter((question) => question.id !== questionId);

          if (updatedQuestions.length === 0) {
            const { [testId]: _, ...rest } = item;

            return rest;
          }

          return {
            ...item,
            [testId]: updatedQuestions,
          };
        }

        return item;
      }).filter((item) => Object.keys(item).length !== 0);
    },
    clearStorage(state, { payload }) {
      const id = payload;

      return state
        .map((item) => {
          const { [id]: _, ...rest } = item;
          return rest;
        })
        .filter((item) => Object.keys(item).length > 0);
    },
  },
});

export const {
  addQuestion, clearStorage, removeQuestion,
} = unsavedQuestionsSlicer.actions;
export default unsavedQuestionsSlicer.reducer;
