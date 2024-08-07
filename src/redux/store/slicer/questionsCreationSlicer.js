import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const questionsCreationSlicer = createSlice({
  name: 'newQuestions',
  initialState,
  reducers: {
    addQuestion(state, action) {
      state.push(action.payload);
    },
  },
});

export const {
  addQuestion,
} = questionsCreationSlicer.actions;
export default questionsCreationSlicer.reducer;
