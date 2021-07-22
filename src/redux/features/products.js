import produce from 'immer';
import { createSelector } from 'reselect';
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

const LOAD_PRODUCTS = 'LOAD_PRODUCTS'

export const loadProducts = (restId) => ({
  type: LOAD_PRODUCTS,
  meta: {
    apiCall: () => api.loadProducts(restId)
  }
})

const initialState = {
  status: idle,
  entities: {},
  error: null,
}

export default (state = initialState, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case LOAD_PRODUCTS + REQUEST:
      return produce(state, (draft) => {
        draft.status = pending;
        draft.error = null;
      });
    case LOAD_PRODUCTS + SUCCESS:
      return produce(state, (draft) => {
        draft.entities = arrToMap(payload);
        draft.status = fulfilled;
      });
    case LOAD_PRODUCTS + FAILURE:
      return produce(state, (draft) => {
        draft.error = error
        draft.status = rejected;
      });
    default:
      return state;
  }
};

export const productsSelector = (state) => state.products.entities;

export const productSelector = (state, { id }) => productsSelector(state)[id];

export const productsLoadingSelector = (state) => 
  (state.products.status === idle || state.products.status === pending)

export const productsListSelector = createSelector(
  productsSelector,
  Object.values
);