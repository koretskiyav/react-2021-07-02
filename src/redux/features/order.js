import { createAction, createReducer } from '@reduxjs/toolkit';

export const increment = createAction('order/increment');
export const decrement = createAction('order/decrement');
export const remove = createAction('order/remove');

export default createReducer(
  {},
  {
    [increment]: (state, { payload: id }) => {
      state[id] = (state[id] || 0) + 1;
    },
    [decrement]: (state, { payload: id }) => {
      state[id] = state[id] > 0 ? (state[id] || 0) - 1 : 0;
    },
    [remove]: (state, { payload: id }) => {
      state[id] = 0;
    },
  }
);

export const orderSelector = (state) => state.order;

export const amountSelector = (state, { id }) => orderSelector(state)[id] || 0;
