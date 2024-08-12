import { createSlice } from '@reduxjs/toolkit';
import uniqid from 'uniqid';

const initialState = [];

const unsavedQuestionsSlicer = createSlice({
  name: 'newQuestions',
  initialState,
  reducers: {
    addQuestion(state, action) {
      const { id, values } = action.payload;
      values.id = uniqid();

      const unsavedQuestionsExisting = state.find((item) => id in item);
      if (unsavedQuestionsExisting) {
        unsavedQuestionsExisting[id].push(values);
      } else {
        state.push({ [id]: [values] });
      }
    },
    clearStorage() {
      return initialState;
    },
  },
});

export const {
  addQuestion, clearStorage,
} = unsavedQuestionsSlicer.actions;
export default unsavedQuestionsSlicer.reducer;
