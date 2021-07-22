import { arrToMap } from '../utils';
import api from '../../api';
import {
  idle,
  pending,
  fulfilled,
  rejected,
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../constants';

const LOAD_PRODUCTS = 'LOAD_PRODUCTS';

export const loadProducts = (restaurantId) => ({
  type: LOAD_PRODUCTS,
  meta: {
    apiCall: () => api.loadProducts(restaurantId),
  },
});

const initialState = {
  status: idle,
  entities: {},
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case LOAD_PRODUCTS + REQUEST:
      return {...state, status: pending, error: null };
    case LOAD_PRODUCTS + SUCCESS:
      return {...state, status: fulfilled, entities: arrToMap(payload)};
    case LOAD_PRODUCTS + FAILURE:
      return { ...state, status: rejected, error };
    default:
      return state;
  }
};

export const productsLoadingSelector = (state) => {
  console.log(state);
  return state.products.status !== fulfilled;
}


export const productsSelector = (state) => state.products.entities;

export const productSelector = (state, { id }) => productsSelector(state)[id];
