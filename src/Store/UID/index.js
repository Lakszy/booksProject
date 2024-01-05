import { createSlice } from '@reduxjs/toolkit';

const uidSlice = createSlice({
  name: 'uid',
  initialState: null,
  reducers: {
    setUid: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUid } = uidSlice.actions;
export default uidSlice.reducer;