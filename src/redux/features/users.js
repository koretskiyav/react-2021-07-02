import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import api from '../../api';
import { idle, pending, fulfilled, rejected } from '../constants';
import { addReview } from './reviews';

import { isLoaded, shouldLoad } from '../utils';

export const loadUsers = createAsyncThunk('users/load', api.loadUsers, {
  condition: (_, { getState }) => shouldLoadUsersSelector(getState()),
});

const Users = createEntityAdapter();

const initialState = Users.getInitialState({
  status: idle,
  error: null,
});

const { reducer } = createSlice({
  name: 'restaurants',
  initialState,
  extraReducers: {
    [loadUsers.pending]: (state) => {
      state.status = pending;
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
    [addReview]: (state, { payload }) => {
      Users.addOne(state, { id: payload.userId, name: payload.review.name });
    },
  },
});

export default reducer;

const usersSelectors = Users.getSelectors((state) => state.users);

export const usersSelector = usersSelectors.selectEntities;
const usersStatusSelector = (state) => state.users.status;

export const usersLoadedSelector = isLoaded(usersStatusSelector);
const shouldLoadUsersSelector = shouldLoad(usersStatusSelector);
