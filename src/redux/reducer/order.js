import { DECREMENT, INCREMENT, RESET } from '../constants';

// { [productId]: amount }
export default (state = {}, action) => {
  const { type, payload: id } = action;
  switch (type) {
    case INCREMENT:
      return { ...state, [id]: (state[id] || 0) + 1};
    case DECREMENT:
      return { ...state, [id]:  state[id] > 0 ? (state[id] - 1) : 0};
    case RESET:
      return { ...state, [id]: 0};
    default:
      return state;
  }
};
