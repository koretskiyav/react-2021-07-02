import { createAction } from '@reduxjs/toolkit';

export const increment = createAction('order/increment');
export const decrement = createAction('order/decrement');
export const remove = createAction('order/remove');

export default (state = {}, action) => {
  const { type, payload: id } = action;
  switch (type) {
    case increment.type:
      return { ...state, [id]: (state[id] || 0) + 1 };
    case decrement.type:
      return { ...state, [id]: state[id] > 0 ? (state[id] || 0) - 1 : 0 };
    case remove.type:
      return { ...state, [id]: 0 };
    default:
      return state;
  }
};

export const orderSelector = (state) => state.order;

export const amountSelector = (state, { id }) => orderSelector(state)[id] || 0;
