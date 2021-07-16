import { DECREMENT, INCREMENT, DELETE_ITEM } from './constants';

export const increment = (id) => ({ type: INCREMENT, payload: id });

export const decrement = (id) => ({ type: DECREMENT, payload: id });

export const deleteItem = (id) => ({ type: DELETE_ITEM, payload: id });
