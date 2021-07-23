import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'my-order',
  initialState: {},
  reducers: {
    increment: (state, { payload: id }) => {
      state[id] = (state[id] || 0) + 1;
    },
    decrement: (state, { payload: id }) => {
      state[id] = state[id] > 0 ? (state[id] || 0) - 1 : 0;
    },
    remove: (state, { payload: id }) => {
      state[id] = 0;
    },
  },
});

export default reducer;
const { increment, decrement, remove } = actions;
export { increment, decrement, remove };

export const orderSelector = (state) => state.order;

export const amountSelector = (state, { id }) => orderSelector(state)[id] || 0;
