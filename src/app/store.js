import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import searchReducer from '../features/posts/search/searchSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    search: searchReducer,
  },
});

export default store;
