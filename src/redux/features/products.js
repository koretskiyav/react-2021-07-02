import { arrToMap } from '../utils';
import api from '../../api';
import { REQUEST, SUCCESS, FAILURE } from '../constants';

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';

export const loadProducts = (restId) => ({
  type: LOAD_PRODUCTS,
  meta: {
    apiCall: () => api.loadProducts(restId),
  },
  restId,
});

const initialValue = {
  productsWasLoadedFor: {},
  entities: {},
  error: null,
};

export default (state = initialValue, action) => {
  const { type, payload, restId, error } = action;

  switch (type) {
    case LOAD_PRODUCTS + REQUEST:
      return state;
    case LOAD_PRODUCTS + SUCCESS:
      return {
        ...state,
        productsWasLoadedFor: { ...state.productsWasLoadedFor, [restId]: true },
        entities: { ...state.entities, ...arrToMap(payload) },
      };
    case LOAD_PRODUCTS + FAILURE:
      return { ...state, error: error };
    default:
      return state;
  }
};

export const productsSelector = (state) => state.products.entities;

export const loadingProductsSelector = (state, props) =>
  !state.products.productsWasLoadedFor[props.restId];

export const productSelector = (state, { id }) => productsSelector(state)[id];
