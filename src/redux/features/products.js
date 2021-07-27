import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import api from '../../api';
import { pending, fulfilled, rejected } from '../constants';
import { isLoaded, shouldLoad } from '../utils';

export const loadProducts = createAsyncThunk(
  'products/load',
  api.loadProducts,
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
      Products.addMany(state, action);
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
