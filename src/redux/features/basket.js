import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { replace } from 'connected-react-router';
import api from '../../api';
import { pending, fulfilled, rejected, idle } from '../constants';

export const requestBasket = createAsyncThunk(
  'basket/process',
  (orderBaskets, { dispatch }) =>
    api
      .requestBasket(orderBaskets)
      .then((res) => {
        // почему нельзя вызвать dispatch  отсюда?
        // dispatch(clearOrder);
        dispatch(replace('/success'));
        return res;
      })
      .catch((res, error) => {
        res.then((data) => {
          dispatch(replace({ pathname: '/error', state: data }));
        });
        throw error;
      })
);

const Baskets = createEntityAdapter();

const initialState = Baskets.getInitialState({
  status: idle,
  error: null,
  message: null,
});

const { reducer } = createSlice({
  name: 'basket',
  initialState,
  extraReducers: {
    [requestBasket.pending]: (state) => {
      state.status = pending;
      state.error = null;
    },
    [requestBasket.fulfilled]: (state, { payload }) => {
      state.status = fulfilled;
      state.message = payload;
    },
    [requestBasket.rejected]: (state, action) => {
      state.status = rejected;
      state.error = action.error;
    },
  },
});

export default reducer;

export const basketsStatusSelectors = (state) =>
  state.basket.status === pending;
