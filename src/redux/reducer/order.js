import { DECREMENT, INCREMENT, REMOVE } from '../constants';

// { [productId]: amount }
export default (state = {}, action) => {
  const { type, payload: id } = action;

  function removeItem() {
    const newState = { ...state };
    delete newState[id];
    return newState;
  }

  switch (type) {
    case INCREMENT:
      return { ...state, [id]: (state[id] || 0) + 1 };
    case DECREMENT:
      return { ...state, [id]: ((state[id] || 0) - 1 ) <= 0 ? 0 : (state[id] || 0) - 1  };
    case REMOVE:
      return removeItem();
    default:
      return state;
  }
};
