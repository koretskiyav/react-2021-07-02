import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { arrToMap, isLoaded, shouldLoad } from '../utils';
import api from '../../api';
import { idle, pending, fulfilled, rejected } from '../constants';
import { addReview } from './reviews';

export const loadUsers = createAsyncThunk('users/load', api.loadUsers, {
  condition: (id, { getState }) =>
    shouldLoadUsersSelector(getState()),
});

const Users = createEntityAdapter();

const initialState = Users.getInitialState({
  status: idle,
  entities: {},
  error: null,
});

const { reducer } = createSlice({
  name: 'users',
  initialState,
  extraReducers: {
    [loadUsers.pending]: (state) => {
      state.error = null;
    },
    [loadUsers.fulfilled]: (state, action) => {
      state.status = fulfilled;
      Users.addMany(state, action);
    },
    [loadUsers.rejected]: (state, { error }) => {
      state.status = rejected;
      state.error = error;
    },
    [addReview]:  (state, { payload }) => {
      const { review, userId } = payload;
      const { text, rating } = review;
      Users.addOne(state, { id: userId, name: review.name });
    }
  }
});

export default reducer;
export const usersSelector = (state) => state.users.entities;
const usersStatusSelector = (state) => state.users.status;
export const usersLoadedSelector = isLoaded(usersStatusSelector);
const shouldLoadUsersSelector = shouldLoad(usersStatusSelector);
