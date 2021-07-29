import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';
import api from '../../api';
import { 
  idle,
  pending,
  fulfilled,
  rejected
} from '../constants';

const initialState = {
  entities: {},
}

const { reducer, actions } = createSlice({
  name: 'order',
  initialState,
  reducers: {
    increment(state, { payload: id }) {
      state.entities[id] = (state.entities[id] || 0) + 1;
    },
    decrement(state, { payload: id }) {
      state.entities[id] = state.entities[id] > 0 ? (state.entities[id] || 0) - 1 : 0;
    },
    remove(state, { payload: id }) {
      state.entities[id] = 0;
    },
  },
});

export default reducer;
const { increment, decrement, remove } = actions;
export { increment, decrement, remove };

export const orderSelector = (state) => state.order.entities;

export const amountSelector = (state, { id }) => orderSelector(state)[id] || 0;
