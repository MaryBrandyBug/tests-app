import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser({ payload }) {
      return payload;
    },
    deleteUser() {
      return initialState;
    },
  },
});

export const {
  getUser, deleteUser,
} = userSlice.actions;
export default userSlice.reducer;
