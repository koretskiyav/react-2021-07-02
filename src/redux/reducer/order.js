import { DECREMENT, INCREMENT, REMOVE } from '../constants';

export default (state = {}, action) => {
  const { type, payload: id } = action;
  switch (type) {
    case INCREMENT:
      return {
        ...state,
        [id]: (state[id] || 0) + 1,
      };
    case DECREMENT:
      if (state[id]) {
        return { ...state, [id]: state[id] - 1 };
      } else {
        delete state[id];
        return { state };
      }
    case REMOVE: {
      delete state[id];
      return { state };
    }
    default:
      return state;
  }
};

//console.log(store.getState())
