import { DECREMENT, INCREMENT, DELETE_ITEM } from '../constants';

// { [productId]: amount }
export default (state = {}, action) => {
  const { type, payload: id } = action;
  switch (type) {
    case INCREMENT:
      return { ...state, [id]: (state[id] || 0) + 1 };
    case DECREMENT:
      return { ...state, [id]: (state[id] || 0) - 1 };
    case DELETE_ITEM:
      const newObj = {...state};
      delete newObj[id];

      return newObj;
    default:
      return state;
  }
};
