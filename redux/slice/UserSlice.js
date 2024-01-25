import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  username: '',
  password: '',
  loggedIn: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.loggedIn = action.payload.loggedIn;
    },
  },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;
