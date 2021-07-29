import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';
import api from '../../api';
import { 
  idle,
  pending,
  fulfilled,
  rejected
} from '../constants';

export const processCheckout = createAsyncThunk(
  'checkout/process',
  api.processOrder
)

const initialState = {
  status: idle,
  error: null
}

const { reducer } = createSlice({
  name: 'checkout',
  initialState,
  extraReducers: {
    [processCheckout.pending]: (state, _) => {
      state.status = pending;
      state.error = null;
    },
    [processCheckout.fulfilled]: (state, _) => {
      state.status = fulfilled;
    },
    [processCheckout.rejected]: (state, { error }) => {
      state.status = rejected;
      state.error = error;
    }
  },
});

export const checkoutSuccessSelector = (state) => 
  (state.checkout.status === fulfilled);

export const checkoutErrorSelector = (state) => 
  (state.checkout.status === rejected);

export const checkoutProcessingSelector = (state) =>
  (state.checkout.status === pending);

export default reducer;
