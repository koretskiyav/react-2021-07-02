import { DECREMENT, INCREMENT } from '../constants';

const initialState = {
}

// { [productId]: amount }
export default (state = initialState, action) => {
  const { type, payload: id } = action;
  switch (type) {
    case INCREMENT:
      return { ...state, [id]: (state[id] || 0) + 1 };
    case DECREMENT:
      return { ...state, [id]: (state[id] || 1) - 1 };
    default:
      return state;
  }
};
