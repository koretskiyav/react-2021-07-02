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
import { CHANGE_RESTAURANT } from './restaurants';

const LOAD_PRODUCTS = 'LOAD_PRODUCTS';

export const loadProducts = (resId) => ({
  type: LOAD_PRODUCTS,
  meta: {
    apiCall: () => api.loadProducts(resId),
  },
  resId,
});

const initialState = {
  status: idle,
  entities: {},
  loaded: {},
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload, error, resId } = action;

  switch (type) {
    case CHANGE_RESTAURANT:
      return { ...state, status: idle, error: null };
    case LOAD_PRODUCTS + REQUEST:
      return { ...state, status: pending, error: null };
    case LOAD_PRODUCTS + SUCCESS:
      return {
        ...state,
        status: fulfilled,
        loaded: { ...state.loaded, [resId]: true },
        entities: { ...state.entities, ...arrToMap(payload) },
      };
    case LOAD_PRODUCTS + FAILURE:
      return { ...state, status: rejected, error };
    default:
      return state;
  }
};

export const productsSelector = (state) => state.products.entities;
export const productsLoadingSelector = (state) =>
  state.products.status !== fulfilled;

export const productsNeedsLoadingSelector = (state, { resId }) =>
  !state.products.loaded[resId];

export const productSelector = (state, { id }) => productsSelector(state)[id];
