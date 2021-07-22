//import { normalizedProducts } from '../../fixtures';
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

export const loadProducts = (restId) => async (dispatch) => {
  dispatch({ type: LOAD_PRODUCTS + REQUEST, restId });
  try {
    const payload = await api.loadProducts(restId);
    dispatch({ type: LOAD_PRODUCTS + SUCCESS, payload, restId });
  } catch (error) {
    dispatch({ type: LOAD_PRODUCTS + FAILURE, error, restId });
  }
};
export const productLoadingSelector = (state) => {
  return state.products.status !== fulfilled;
};

const initialState = {
  status: idle,
  entities: {},
  error: null,
};
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_PRODUCTS + SUCCESS:
      return {
        ...state,
        //activeId: payload[0].id,
        status: fulfilled,
        entities: payload,
      };
    default:
      return state;
  }
};

export const productsSelector = (state) => {
  return state.products?.entities;
};

export const productSelector = (state, { id }) => productsSelector(state)[id];
