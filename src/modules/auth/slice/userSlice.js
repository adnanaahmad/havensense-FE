import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token'),
  user: {}
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setToken: (state, action) => {
        state.token = action.payload.token;
    },
    setUserDetails: (state, action) => {
      state.user = action.payload.user;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setToken, setUserDetails } = userSlice.actions

export default userSlice.reducer;