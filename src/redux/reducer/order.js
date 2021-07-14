import { DECREMENT, INCREMENT, REMOVE } from '../constants';

// { [productId]: amount }
export default (state = {}, action) => {
  const { type, payload: { id, name, price } = {} } = action;

  switch (type) {
    case INCREMENT:
      return {
        ...state,
        [id]: {
          amount: (state[id]?.amount || 0) + 1,
          name,
          price,
        },
      };
    case DECREMENT:
      if (!state[id]) return state;

      if (state[id] && state[id].amount === 1) {
        delete state[id];
        return { ...state };
      }

      return {
        ...state,
        [id]: {
          amount: (state[id]?.amount || 0) - 1,
          name,
          price,
        },
      };
    case REMOVE:
      delete state[id];
      return { ...state };
    default:
      return state;
  }
};
