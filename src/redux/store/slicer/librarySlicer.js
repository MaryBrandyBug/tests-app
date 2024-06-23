import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    getAllTests(state, action) {
      return action.payload;
    },
  },
});

export const {
  getAllTests,
} = librarySlice.actions;
export default librarySlice.reducer;
