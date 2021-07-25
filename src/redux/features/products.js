import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

import api from '../../api';
import { pending, fulfilled, rejected } from '../constants';
import { isLoaded, shouldLoad } from '../utils';

export const loadProducts = createAsyncThunk('products/load', api.loadProducts);

const Products = createEntityAdapter();
const initialState = Products.getInitialState({
  status: {},
  entities: {},
  error: null,
});

const { reducer } = createSlice({
  name: 'products',
  initialState,
  extraReducers: {
    [loadProducts.pending] :(state, action) => {
      state.status[action.meta.arg] = pending;
      state.error = null;
    },
    [loadProducts.fulfilled] :(state, { meta, payload }) => {
      state.status[meta.arg] = fulfilled;
      Products.addMany(state, payload);
    },
    [loadProducts.rejected] :(state,  { meta, error }) => {
      state.status[meta.arg] = rejected;
      state.error = error;
    },
  }
});

export default reducer;

export const productsSelector = (state) => state.products.entities;

export const productSelector = (state, { id }) => productsSelector(state)[id];
const productsStatusSelector = (state, { restId }) =>
  state.products.status[restId];
export const productsLoadedSelector = isLoaded(productsStatusSelector);
export const shouldLoadProductsSelector = shouldLoad(productsStatusSelector);
