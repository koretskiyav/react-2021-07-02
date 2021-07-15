import { DECREMENT, INCREMENT, DELETE, APPEND } from './constants';

export const increment = (id) => ({ type: INCREMENT, payload: id });
export const decrement = (id) => ({ type: DECREMENT, payload: id });
export const deleteBasket = (id) => ({ type: DELETE, payload: id });
export const append = (product) => ({ type: APPEND, payload: product});
