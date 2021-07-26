import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import { fulfilled, pending, rejected } from '../constants';

import { isLoaded, shouldLoad } from '../utils';

const Products = createEntityAdapter();
const initialState = Products.getInitialState({
  status: {},
  error: null
});
export const loadProducts = createAsyncThunk('products/load', api.loadProducts, {
  condition: (restId, { getState }) =>
    shouldLoadProductsSelector(getState(), { restId })
});
const { reducer } = createSlice({
  name: 'reviews',
  initialState,
  extraReducers: {
    [loadProducts.pending]: (state, { meta }) => {
      state.status[meta.arg] = pending;
      state.error = null;
    },
    [loadProducts.fulfilled]: (state, action) => {
      state.status[action.meta.arg] = fulfilled;
      Products.addMany(state, action);
    },
    [loadProducts.rejected]: (state, { meta, error }) => {
      state.status[meta.arg] = rejected;
      state.error = error;
    }
  }
});

export default reducer;

export const productsSelector = (state) => state.products.entities;

export const productSelector = (state, { id }) => productsSelector(state)[id];
const productsStatusSelector = (state, { restId }) =>
  state.products.status[restId];
export const productsLoadedSelector = isLoaded(productsStatusSelector);
export const shouldLoadProductsSelector = shouldLoad(productsStatusSelector);
