import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import { fulfilled, idle, pending, rejected } from '../constants';
import { addReview } from './reviews';
import { isLoaded, shouldLoad } from '../utils';

export const loadRestaurants = createAsyncThunk(
  'restaurants/load',
  api.loadRestaurants,
  { condition: (_, { getState }) => shouldLoadRestaurantsSelector(getState()) }
);

const Restaurants = createEntityAdapter();

const initialState = Restaurants.getInitialState({
  status: idle,
  error: null
});

const { reducer } = createSlice({
  name: 'restaurants',
  initialState,
  extraReducers: {
    [loadRestaurants.pending]: (state) => {
      state.status = pending;
      state.error = null;
    },
    [loadRestaurants.fulfilled]: (state, { payload }) => {
      state.status = fulfilled;
      Restaurants.addMany(state, payload);
    },
    [loadRestaurants.rejected]: (state, { error }) => {
      state.status = rejected;
      state.error = error;
    },
    [addReview]: (state, { payload }) => {
      state.entities[payload.restId].reviews.push(payload.reviewId);
    }
  }
});

export default reducer;

const restaurantsSelectors = Restaurants.getSelectors(
  (state) => state.restaurants
);

const restaurantsStatusSelector = (state) => state.restaurants.status;

export const restaurantsListSelector = restaurantsSelectors.selectAll;

export const restaurantSelector = (state, { id }) =>
  restaurantsSelectors.selectById(state, id);

export const restaurantsLoadedSelector = isLoaded(restaurantsStatusSelector);
const shouldLoadRestaurantsSelector = shouldLoad(restaurantsStatusSelector);
