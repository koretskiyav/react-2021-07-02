import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import { isLoaded, shouldLoad } from '../utils';
import api from '../../api';

import { idle, pending, fulfilled, rejected } from '../constants';
import { addReview } from './reviews';

export const loadUsers = createAsyncThunk('users/load', api.loadUsers, {
  condition: (arg, { getState }) => shouldLoadUsersSelector(getState()),
});

const Users = createEntityAdapter();

const initialState = Users.getInitialState({
  status: idle,
  error: null,
});

const { reducer } = createSlice({
  name: 'users',
  initialState,
  extraReducers: {
    [loadUsers.pending]: (state) => {
      state.status = pending;
      state.error = null;
    },
    [loadUsers.fulfilled]: (state, { payload }) => {
      state.status = fulfilled;
      Users.addMany(state, payload);
    },
    [loadUsers.rejected]: (state, { error }) => {
      state.status = rejected;
      state.error = error;
    },
    [addReview]: (
      state,
      {
        payload: {
          review: { name },
          userId,
        },
      }
    ) => {
      Users.addOne(state, { id: userId, name });
    },
  },
});

export default reducer;

export const { selectEntities: usersSelector } = Users.getSelectors(
  (state) => state.users
);

const usersStatusSelector = (state) => state.users.status;

export const usersLoadedSelector = isLoaded(usersStatusSelector);
const shouldLoadUsersSelector = shouldLoad(usersStatusSelector);
