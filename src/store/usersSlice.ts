import { fetchData } from '../helpers/fetching';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type UsersInitial = {
  users: Array<User>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | string;
};

const initialState: UsersInitial = {
  users: [],
  status: 'idle',
  error: null,
};

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = createAsyncThunk<Array<User>>(
  '/users/fetchUsers',
  fetchData.bind(this, USERS_URL)
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: () => {},
    editUser: () => {},
    removeUser: () => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      action.payload.forEach(({ id, name, username, email }) => {
        state.users.push({ id, name, username, email });
      });
    });
  },
});

export const selectAllUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
