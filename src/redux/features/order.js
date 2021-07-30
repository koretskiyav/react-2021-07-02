import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import api from '../../api';
import { idle, pending, fulfilled, rejected } from '../constants';
import { isLoading } from '../utils';

export const addOrder = createAsyncThunk(
  'order/add',
  async (_, { dispatch, getState }) => {
    const order = orderDataSelector(getState());

    try {
      await api.addOrder(order);
      dispatch(push('/order-success'));
    } catch (err) {
      dispatch(push('/order-error'));
      throw err;
    }
  }
);

const initialState = {
  entities: {},
  status: idle,
  error: null,
};

const { reducer, actions } = createSlice({
  name: 'order',
  initialState,
  reducers: {
    increment(state, { payload: id }) {
      state.entities[id] = (state.entities[id] || 0) + 1;
    },
    decrement(state, { payload: id }) {
      state.entities[id] =
        state.entities[id] > 0 ? (state.entities[id] || 0) - 1 : 0;
    },
    remove(state, { payload: id }) {
      state.entities[id] = 0;
    },
  },
  extraReducers: {
    [addOrder.pending]: (state) => {
      state.status = pending;
      state.error = null;
    },
    [addOrder.fulfilled]: (state) => {
      state.status = fulfilled;
      state.entities = {};
    },
    [addOrder.rejected]: (state, { error }) => {
      state.status = rejected;
      state.error = error.message;
    },
  },
});

export default reducer;
const { increment, decrement, remove } = actions;
export { increment, decrement, remove };

export const orderSelector = (state) => state.order.entities;
export const orderErrorSelector = (state) => state.order.error;
const orderStatusSelector = (state) => state.order.status;

export const amountSelector = (state, { id }) => orderSelector(state)[id] || 0;

export const orderLoadingSelector = isLoading(orderStatusSelector);

export const orderDataSelector = createSelector(orderSelector, (order) =>
  Object.entries(order).map(([id, amount]) => ({ id, amount }))
);
