import { createSlice, createAction } from '@reduxjs/toolkit';

export const clearOrder = createAction('order/clear', () => ({
  
}));

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
    clearOrder(state, action) {
     console.log('5', state)
    },
  },
});

export default reducer;
const { increment, decrement, remove } = actions;
export { increment, decrement, remove };

export const orderSelector = (state) => state.order;

export const amountSelector = (state, { id }) => orderSelector(state)[id] || 0;
