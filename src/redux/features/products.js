import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import api from '../../api';
import { pending, fulfilled, rejected } from '../constants';

import { isLoaded, shouldLoad } from '../utils';

export const loadProducts = createAsyncThunk(
  'products/load',
  api.loadProducts,
  {
    condition: (restId, { getState }) => {
      shouldLoadProductsSelector(getState(), { restId });
    },
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
    [loadProducts.fulfilled]: (state, { payload, meta }) => {
      state.status[meta.arg] = fulfilled;
      Products.addMany(state, payload);
    },
    [loadProducts.rejected]: (state, { error, meta }) => {
      state.status[meta.arg] = rejected;
      state.error = error;
    },
  },
});

export default reducer;

export const { selectEntities: productsSelector, selectById: productSelector } =
  Products.getSelectors((state) => state.products);

export const productsStatusSelector = (state, { restId }) =>
  state.products?.status[restId];
export const productsLoadedSelector = isLoaded(productsStatusSelector);
export const shouldLoadProductsSelector = shouldLoad(productsStatusSelector);
