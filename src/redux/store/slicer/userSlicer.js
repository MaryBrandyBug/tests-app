import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    currentUser(state, { payload }) {
      return payload;
    },
  },
});

export const {
  currentUser,
} = userSlice.actions;
export default userSlice.reducer;
