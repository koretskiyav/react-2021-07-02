import {
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  createAction,
} from '@reduxjs/toolkit';

import { isLoaded, shouldLoad } from '../utils';
import api from '../../api';

import { idle, pending, fulfilled, rejected } from '../constants';
import { addReview } from './reviews';

export const changeRestaurant = createAction('restaurants/change');

export const loadRestaurants = createAsyncThunk(
  'restaurants/load',
  api.loadRestaurants
);

const Restaurants = createEntityAdapter();

const initialState = Restaurants.getInitialState({
  activeId: null,
  status: idle,
  error: null,
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
      state.activeId = payload[0].id;
      Restaurants.addMany(state, payload);
    },
    [loadRestaurants.rejected]: (state, { error }) => {
      state.status = rejected;
      state.error = error;
    },
    [changeRestaurant]: (state, { payload: activeId }) => {
      state.activeId = activeId;
    },
    [addReview]: (state, { payload: { restId, reviewId } }) => {
      Restaurants.updateOne(state, {
        id: restId,
        changes: state.entities[restId].reviews.push(reviewId),
      });
    },
  },
});

export default reducer;

export const {
  selectEntities: restaurantsSelector,
  selectById: restaurantSelector,
} = Restaurants.getSelectors((state) => state.restaurants);

export const activeRestaurantIdSelector = (state) => state.restaurants.activeId;
const restaurantsStatusSelector = (state) => state.restaurants.status;

export const restaurantsListSelector = createSelector(
  restaurantsSelector,
  Object.values
);

export const restaurantsLoadedSelector = isLoaded(restaurantsStatusSelector);
export const shouldLoadRestaurantsSelector = shouldLoad(
  restaurantsStatusSelector
);
