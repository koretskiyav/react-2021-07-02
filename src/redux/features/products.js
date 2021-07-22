import {FAILURE, fulfilled, rejected, SUCCESS} from '../constants';
import { arrToMap } from '../utils';

export const LOAD_PRODUCTS = "LOAD_PRODUCTS";

export const loadProducts = (prodId) => ({
  type: LOAD_PRODUCTS,
  meta: {
    apiCall: () => {
      return fetch(`/api/products?id=${prodId}`).then((res) => res.json());
    }
  },
});

// { id: { id, name, ingredients }};
export default (state = {}, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case LOAD_PRODUCTS + SUCCESS:
      return { ...state, ...arrToMap(payload), status: fulfilled, error: null };
    case LOAD_PRODUCTS + FAILURE:
      return { ...state, ...arrToMap(payload), status: rejected, error };
    default:
      return state;
  }
};

export const productsSelector = (state) => state.products;

export const productSelector = (state, props) => productsSelector(state)[props.id];
