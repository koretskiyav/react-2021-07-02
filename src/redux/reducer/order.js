import { DECREMENT, INCREMENT, CLEAR } from '../constants';

// { [productId]: amount }
export default (state = {}, action) => {
  const { type, payload: id } = action;
  switch (type) {
    case INCREMENT:
      return { ...state, [id]: (state[id] || 0) + 1 };
    case DECREMENT:
      return { ...state, [id]: (state[id] || 0) - 1 };
    case CLEAR:
      return { ...state, [id]: state[id] = 0 };
    default:
      return state;
  }
};
