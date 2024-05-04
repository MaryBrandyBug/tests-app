import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    getTest(state, action) {
      return action.payload;
    },
    deleteQuestion(state, action) {
      const id = action.payload;
      return {
        ...state,
        questions: state.questions.filter((item) => item.id !== id),
      };
    },
    addQuestion(state, action) {
      state.questions.push(action.payload);
    },
  },
});

export const {
  getTest, deleteQuestion, addQuestion,
} = testSlice.actions;
export default testSlice.reducer;
