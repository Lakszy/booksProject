import {createSlice} from '@reduxjs/toolkit';



const initialObj = {
  isLoggedIn: false,
  user: null,
};

const slice = createSlice({
  name: 'auth',
  initialState: initialObj,
  reducers: {
    loginReducer: (state, {payload}) => {
      state.isLoggedIn = true;
      state.user = payload;
    },
    logoutReducer: state => {
      state.isLoggedIn = false;
      state.user = null;
    },
    updateProfileReducer: (state, {payload}) => {
      state.user = {...state.user, ...payload};
    },
  },
});

export const {loginReducer, logoutReducer, updateProfileReducer} =
  slice.actions;

export default slice.reducer;



