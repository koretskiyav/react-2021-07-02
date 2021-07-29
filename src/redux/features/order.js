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

export const processOrder = createAsyncThunk(
  'order/process',
  api.processOrder,
)

const initialState = {
  entities: {},
  status: idle,
  error: null
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
    [processOrder.pending]: (state, _) => {
      state.status = pending;
      state.error = null;
    },
    [processOrder.fulfilled]: (state, _) => {
      state.status = fulfilled;
    },
    [processOrder.rejected]: (state, { error }) => {
      state.status = rejected;
      state.error = error;
      state.entities['foo'] = 100;
    }
  },
});

export default reducer;
const { increment, decrement, remove } = actions;
export { increment, decrement, remove };

export const orderSelector = (state) => state.order.entities;

export const orderSuccessSelector = (state) => (state.order.status === fulfilled) 
export const orderErrorSelector = (state) => (state.order.status === rejected) 

export const amountSelector = (state, { id }) => orderSelector(state)[id] || 0;
