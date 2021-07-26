import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { isLoaded, shouldLoad } from '../utils';
import api from '../../api';
import { fulfilled, idle, pending, rejected } from '../constants';
import { addReview } from './reviews';

const Users = createEntityAdapter();
const initialState = Users.getInitialState({
  status: idle,
  error: null
});

export const loadUsers = createAsyncThunk('users/load',
  api.loadUsers,
  {
    condition: (_, { getState }) => shouldLoadUsersSelector(getState())
  }
);


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
      state.activeId = action.payload[0].id;
      Users.addMany(state, action);
    },
    [loadUsers.rejected]: (state, { meta, error }) => {
      state.status[meta.arg] = rejected;
      state.error = error;
    },
    [addReview.type]: (state, { meta, payload }) => {
      const { name } = payload.review;
      const { userId } = payload;
      Users.addOne(state, { id: userId, name });
    }
  }
});

export default reducer;

export const usersSelector = (state) => state.users.entities;
const usersStatusSelector = (state) => state.users.status;
export const usersLoadedSelector = isLoaded(usersStatusSelector);
const shouldLoadUsersSelector = shouldLoad(usersStatusSelector);
