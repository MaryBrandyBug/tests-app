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
    editQuestion(state, action) {
      const updatedQuestion = action.payload;
      return {
        ...state,
        questions: state.questions.map((item) => {
          if (item.id === updatedQuestion.id) return updatedQuestion;
          return item;
        }),
      };
    },
  },
});

export const {
  getTest, deleteQuestion, addQuestion, editQuestion,
} = testSlice.actions;
export default testSlice.reducer;
