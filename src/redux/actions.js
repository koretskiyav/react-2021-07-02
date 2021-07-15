import { DECREMENT, INCREMENT, EMPTY } from './constants';

export const increment = (id) => ({ type: INCREMENT, payload: id });
export const decrement = (id) => ({ type: DECREMENT, payload: id });
export const empty = (id) => ({ type: EMPTY, payload: id });
