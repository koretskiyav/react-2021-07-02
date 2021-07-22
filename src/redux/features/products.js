import {
  idle,
  pending,
  fulfilled,
  rejected,
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../constants';
import api from '../../api';
import { arrToMap } from '../utils';
import produce from 'immer';

const LOAD_PRODUCTS = 'LOAD_PRODUCTS';

export const loadProducts = (restId) => ({
  type: LOAD_PRODUCTS,
  meta: {
    apiCall: () => api.loadProducts(restId),
  },
  restId,
});

const initialState = {
  status: idle,
  entities: {
    restLoadingId: [],
    content: {},
  },
  error: null,
};

export default produce((draft = initialState, action) => {
  const { type, payload, error, restId } = action;
  switch (type) {
    case LOAD_PRODUCTS + REQUEST:
      return { ...draft, status: pending, error: null };
    case LOAD_PRODUCTS + SUCCESS:
      const newRestLoadingId = [...draft.entities.restLoadingId];
      const isResrId = newRestLoadingId.includes(restId);
      if (isResrId === false) {
        newRestLoadingId.push(restId);
      }

      return {
        ...draft,
        status: fulfilled,
        entities: {
          restLoadingId: newRestLoadingId,
          content: { ...draft.entities.content, ...arrToMap(payload) },
        },
      };
    case LOAD_PRODUCTS + FAILURE:
      return { ...draft, status: rejected, error };
    default:
      return draft;
  }
});

export const productsSelector = (state) => state.products.entities.content;

export const productsSelectorLoadingId = (state) =>
  state.products.entities.restLoadingId;

export const productSelector = (state, { id }) => productsSelector(state)[id];

export const productMenuSelector = (state, { restId }) => restId;
