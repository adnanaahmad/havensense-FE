import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  posts: []
}

export const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    createPost: (state, action) => {
        state.posts = [action.payload.post, ...state.posts];
    },
    updatePost: (state, action) => {
        let index = state.posts.findIndex(post => post._id === action.payload.post._id);
        state.posts[index] = action.payload.post;
    },    
    updatePostArray: (state, action) => {
        state.posts = action.payload.posts;
    },
    updateUser: (state, action) => {
        state.user = {...state.user, ...action.payload.user};
    },
    deletePost: (state, action) => {
        let index = state.posts.findIndex(post => post._id === action.payload.id);
        if (index > -1) state.posts.splice(index, 1);
    }
  },
})

// Action creators are generated for each case reducer function
export const { createPost, updatePost, updatePostArray, updateUser, deletePost } = profileSlice.actions;

export default profileSlice.reducer;