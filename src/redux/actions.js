import { DECREMENT, INCREMENT, REMOVE } from './constants';

export const increment = ({ id, name, price }) => ({
  type: INCREMENT,
  payload: { id, name, price },
});
export const decrement = ({ id, name, price }) => ({
  type: DECREMENT,
  payload: { id, name, price },
});
export const remove = (id) => ({
  type: REMOVE,
  payload: { id },
});
