import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newsFeed: [],
}

export const playByPlaySlice = createSlice({
  name: 'playByPlaySlice',
  initialState,
  reducers: {
    createPost: (state, action) => {
        state.newsFeed = [action.payload.post, ...state.newsFeed];
    },
    updatePost: (state, action) => {
        let index = state.newsFeed.findIndex(post => post._id === action.payload.post._id);
        state.newsFeed[index] = action.payload.post;
    },    
    updateNewsFeed: (state, action) => {
        state.newsFeed = action.payload.newsFeed;
    },
    deletePost: (state, action) => {
        let index = state.newsFeed.findIndex(post => post._id === action.payload.id);
        if (index > -1) state.newsFeed.splice(index, 1);
    }
  },
})

// Action creators are generated for each case reducer function
export const { createPost, updatePost, updateNewsFeed, deletePost } = playByPlaySlice.actions

export default playByPlaySlice.reducer;