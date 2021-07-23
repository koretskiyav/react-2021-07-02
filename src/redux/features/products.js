import produce from 'immer';
import api from '../../api';
import {
  pending,
  fulfilled,
  rejected,
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../constants';

import { arrToMap, isLoaded, shouldLoad } from '../utils';

const LOAD_PRODUCTS = 'LOAD_PRODUCTS';

export const loadProducts = (restId) => ({
  type: LOAD_PRODUCTS,
  meta: {
    apiCall: () => api.loadProducts(restId),
    restId,
  },
});

const initialState = {
  status: {},
  entities: {},
  error: null,
};

export default produce((draft = initialState, action) => {
  const { type, payload, error, meta } = action;

  switch (type) {
    case LOAD_PRODUCTS + REQUEST: {
      draft.status[meta.restId] = pending;
      draft.error = null;
      break;
    }
    case LOAD_PRODUCTS + SUCCESS: {
      draft.status[meta.restId] = fulfilled;
      Object.assign(draft.entities, arrToMap(payload));
      break;
    }
    case LOAD_PRODUCTS + FAILURE: {
      draft.status[meta.restId] = rejected;
      draft.error = error;
      break;
    }
    default:
      return draft;
  }
});

export const productsSelector = (state) => state.products.entities;

export const productSelector = (state, { id }) => productsSelector(state)[id];
const productsStatusSelector = (state, { restId }) =>
  state.products.status[restId];
export const productsLoadedSelector = isLoaded(productsStatusSelector);
export const shouldLoadProductsSelector = shouldLoad(productsStatusSelector);
