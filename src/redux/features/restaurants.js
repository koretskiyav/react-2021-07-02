import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import api from '../../api';
import { idle, pending, fulfilled, rejected } from '../constants';
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
  error: null,
});

const { reducer, actions } = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    changeRestaurant(state, { payload: activeId }) {
      state.activeId = activeId;
    },
  },
  extraReducers: {
    [loadRestaurants.pending]: (state) => {
      state.status = pending;
      state.error = null;
    },
    [loadRestaurants.fulfilled]: (state, { payload }) => {
      state.status = fulfilled;
      state.activeId = payload[0].id;
      Restaurants.addMany(state, payload);
    },
    [loadRestaurants.rejected]: (state, { error }) => {
      state.status = rejected;
      state.error = error;
    },
    [addReview]: (state, { payload }) => {
      state.entities[payload.restId].reviews.push(payload.reviewId);
    },
  },
});

export default reducer;
const { changeRestaurant } = actions;
export { changeRestaurant };

const restaurantsSelectors = Restaurants.getSelectors(
  (state) => state.restaurants
);

export const activeRestaurantIdSelector = (state) => state.restaurants.activeId;
const restaurantsStatusSelector = (state) => state.restaurants.status;

export const restaurantsListSelector = restaurantsSelectors.selectAll;

export const restaurantSelector = (state, { id }) =>
  restaurantsSelectors.selectById(state, id);

export const restaurantsLoadedSelector = isLoaded(restaurantsStatusSelector);
const shouldLoadRestaurantsSelector = shouldLoad(restaurantsStatusSelector);
