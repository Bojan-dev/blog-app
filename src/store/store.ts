import { configureStore } from '@reduxjs/toolkit';
import postsReducers from './postsSlice';

import usersReducers from './usersSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducers,
    users: usersReducers,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
