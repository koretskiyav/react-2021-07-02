import { APPEND } from '../constants';

// { [productId]: amount }
export default (state = [], action) => {
  const { type, payload: product } = action;
  switch (type) {
    case APPEND:
      const onPush = state.find((item) => item.id === product.id);
      return onPush ? state : [...state, product];
    default:
      return state;
  }
};
