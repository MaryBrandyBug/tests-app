import { createSlice } from '@reduxjs/toolkit';
import uniqid from 'uniqid';

const initialState = [];

const unsavedQuestionsSlicer = createSlice({
  name: 'newQuestions',
  initialState,
  reducers: {
    addUnsavedQuestion(state, { payload }) {
      const { values } = payload;
      values.id = uniqid();
      state.push(values);
    },
    removeQuestion(state, { payload }) {
      const { questionId } = payload;

      return state.filter((question) => question.id !== questionId);
    },
    clearStorage() {
      return initialState;
    },
  },
});

export const {
  addUnsavedQuestion, clearStorage, removeQuestion,
} = unsavedQuestionsSlicer.actions;
export default unsavedQuestionsSlicer.reducer;
