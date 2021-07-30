import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'order',
  initialState: {},
  reducers: {
    increment(state, { payload: id }) {
      state[id] = (state[id] || 0) + 1;
    },
    decrement(state, { payload: id }) {
      state[id] = state[id] > 0 ? (state[id] || 0) - 1 : 0;
    },
    remove(state, { payload: id }) {
      state[id] = 0;
    },
    clearOrder() {
      return {};
    },
  },
});

export default reducer;
const { increment, decrement, remove, clearOrder } = actions;
export { increment, decrement, remove, clearOrder };

export const orderSelector = (state) => state.order;

export const amountSelector = (state, { id }) => orderSelector(state)[id] || 0;
