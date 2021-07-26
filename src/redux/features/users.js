import { isLoaded, shouldLoad } from '../utils';
import api from '../../api';
import { pending, fulfilled, rejected } from '../constants';
import { addReview } from './reviews';
import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
  createNextState,
} from '@reduxjs/toolkit';

export const loadUsers = createAsyncThunk('users/load', api.loadUsers, {
  condition: (_, { getState }) => shouldLoadUsersSelector(getState()),
});

const Users = createEntityAdapter();

const initialState = Users.getInitialState({
  status: {},
  error: null,
});

const { reducer } = createSlice({
  name: 'users',
  initialState,
  extraReducers: {
    [loadUsers.pending]: (state, action) => {
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
      return createNextState(state, (draft) => {
        const { review, userId } = payload;
        Users.addOne(state, { id: userId, name: review.name });
      });
    },
  },
});

export default reducer;
export const usersSelector = (state) => state.users.entities;
const usersStatusSelector = (state) => state.users.status;
export const usersLoadedSelector = isLoaded(usersStatusSelector);
const shouldLoadUsersSelector = shouldLoad(usersStatusSelector);
