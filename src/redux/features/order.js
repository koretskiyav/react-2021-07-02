import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import api from '../../api';
import { fulfilled, idle, pending, rejected } from '../constants';

export const sendOrder = createAsyncThunk(
  'order/send',
  async (_, { dispatch, getState }) => {
    dispatch(push('/order'));

    const {
      order: { entities: order },
    } = getState();

    const orderJSON = JSON.stringify(
      Object.entries(order).map(([id, amount]) => ({
        id,
        amount,
      }))
    );

    try {
      const response = await api.sendOrder(orderJSON);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  status: idle,
  entities: {},
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
    resetOrderStatus(state) {
      state.status = idle;
    },
  },
  extraReducers: {
    [sendOrder.pending]: (state) => {
      state.status = pending;
      state.error = null;
    },
    [sendOrder.fulfilled]: () => {
      return { ...initialState, status: fulfilled };
    },
    [sendOrder.rejected]: (state, { error }) => {
      state.status = rejected;
      state.error = error;
    },
  },
});

export default reducer;
const { increment, decrement, remove, resetOrderStatus } = actions;
export { increment, decrement, remove, resetOrderStatus };

export const orderSelector = (state) => state.order.entities;

export const orderStatusSelector = (state) => state.order.status;

export const orderErrorSelector = (state) => state.order.error;

export const amountSelector = (state, { id }) => orderSelector(state)[id] || 0;
