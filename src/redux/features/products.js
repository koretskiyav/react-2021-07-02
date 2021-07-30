import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { replace } from 'connected-react-router';
import api from '../../api';
import { pending, fulfilled, rejected } from '../constants';
import { isLoaded, shouldLoad } from '../utils';

export const loadProducts = createAsyncThunk(
  'products/load',
  (restId, { dispatch }) =>
    api.loadProducts(restId).catch((error) => {
      dispatch(replace('/error'));
      throw error;
    }),
  {
    condition: (restId, { getState }) =>
      shouldLoadProductsSelector(getState(), { restId }),
  }
);
const Products = createEntityAdapter();

const initialState = Products.getInitialState({
  status: {},
  error: null,
});

const { reducer } = createSlice({
  name: 'products',
  initialState,
  extraReducers: {
    [loadProducts.pending]: (state, { meta }) => {
      state.status[meta.arg] = pending;
      state.error = null;
    },
    [loadProducts.fulfilled]: (state, action) => {
      state.status[action.meta.arg] = fulfilled;
      const { arg } = action.meta;
      const productNew = action.payload.map(
        ({ id, name, price, ingredients }) => {
          return { restId: arg, id, name, price, ingredients };
        }
      );
      Products.addMany(state, productNew);
    },
    [loadProducts.rejected]: (state, { meta, error }) => {
      state.status[meta.arg] = rejected;
      state.error = error;
    },
  },
});

export default reducer;

const productsSelectors = Products.getSelectors((state) => state.products);

export const productsSelector = productsSelectors.selectEntities;

export const productSelector = (state, { id }) =>
  productsSelectors.selectById(state, id);

const productsStatusSelector = (state, props) =>
  state.products.status[props.restId];

export const productsLoadedSelector = isLoaded(productsStatusSelector);
const shouldLoadProductsSelector = shouldLoad(productsStatusSelector);
