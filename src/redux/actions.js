import { DECREMENT, INCREMENT } from './constants';

export const increment = (id) => ({ type: INCREMENT, payload: id });
export const decrement = (id) => ({ type: DECREMENT, payload: id });
