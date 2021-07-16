const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const REMOVE = 'REMOVE';

export const increment = (id) => ({ type: INCREMENT, payload: id });
export const decrement = (id) => ({ type: DECREMENT, payload: id });
export const remove = (id) => ({ type: REMOVE, payload: id });

export default (state = {}, action) => {
  const { type, payload: id } = action;
  switch (type) {
    case INCREMENT:
      return { ...state, [id]: (state[id] || 0) + 1 };
    case DECREMENT:
      return { ...state, [id]: state[id] > 0 ? (state[id] || 0) - 1 : 0 };
    case REMOVE:
      return { ...state, [id]: 0 };
    default:
      return state;
  }
};

export const orderSelector = (state) => state.order;
