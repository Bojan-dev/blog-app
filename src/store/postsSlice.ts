import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchData } from '../helpers/fetching';

import { RootState } from './store';

export type ReactionsType = {
  [name: string]: number;
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
  reactions: ReactionsType;
};

export type PostsInitial = {
  posts: Array<Post>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | string;
};

const initialState: PostsInitial = {
  posts: [],
  status: 'idle',
  error: null,
};

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk(
  '/posts/fetchPosts',
  fetchData.bind(this, POSTS_URL)
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (
      state,
      action: PayloadAction<{ title: string; body: string; userId: number }>
    ) => {
      const { userId, title, body } = action.payload;

      const newPost: Post = {
        userId,
        title,
        body,
        id: state.posts.length + 1,
        reactions: {
          like: 0,
          wow: 0,
          love: 0,
          top: 0,
          unlike: 0,
        },
      };

      state.posts.unshift(newPost);
    },
    editPost: (
      state,
      action: PayloadAction<{
        title: string;
        body: string;
        userId: number;
        postId: number;
      }>
    ) => {
      const { title, body, userId, postId } = action.payload;
      const editedPost = state.posts.find((post) => post.id === postId);
      if (editedPost) {
        editedPost.body = body;
        editedPost.title = title;
        editedPost.userId = userId;
      }
    },
    removePost: (state, action) => {
      const postsFiltered = state.posts.filter(
        (post) => post.id !== action.payload
      );

      state.posts = postsFiltered;
    },
    addPostReaction: (
      state,
      action: PayloadAction<{ postId: number; reaction: string }>
    ) => {
      const postIndex = state.posts.findIndex(
        (post) => post.id === action.payload.postId
      );
      state.posts[postIndex].reactions[action.payload.reaction]++;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';

        const postsArr = action.payload.map((post: Post) => ({
          userId: post.userId,
          id: post.id,
          title: post.title,
          body: post.body,
          reactions: {
            like: 0,
            wow: 0,
            love: 0,
            top: 0,
            unlike: 0,
          },
        }));

        state.posts = [];
        state.posts.push(...postsArr);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      });
  },
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const selectPostsDataInfo = (state: RootState) => state.posts;
export const selectPost = (state: RootState, postId: number) =>
  state.posts.posts.find((post) => post.id === postId);

export const addNewPost = postsSlice.actions.addPost;
export const updateReaction = postsSlice.actions.addPostReaction;
export const editPost = postsSlice.actions.editPost;
export const removePost = postsSlice.actions.removePost;

export default postsSlice.reducer;
