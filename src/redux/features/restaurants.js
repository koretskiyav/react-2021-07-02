import { createAction, createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import { isLoaded, shouldLoad } from '../utils';
import api from '../../api';
import { fulfilled, idle, pending, rejected } from '../constants';
import { addReview } from './reviews';


const Restaurants = createEntityAdapter();

const initialState = Restaurants.getInitialState({
  status: idle,
  error: null
});

export const changeRestaurant = createAction('restaurants/change', (activeId) => ({
  payload: { activeId }
}));

export const loadRestaurants = createAsyncThunk('restaurants/load',
  api.loadRestaurants,
  {
    condition: (_, { getState }) => shouldLoadRestaurantsSelector(getState())
  }
);


const { reducer } = createSlice({
  name: 'restaurants',
  initialState,
  extraReducers: {
    [loadRestaurants.pending]: (state) => {
      state.status = pending;
      state.error = null;
    },
    [loadRestaurants.fulfilled]: (state, action) => {
      state.status = fulfilled;
      state.activeId = action.payload[0].id;
      Restaurants.addMany(state, action);
    },
    [loadRestaurants.rejected]: (state, { meta, error }) => {
      state.status[meta.arg] = rejected;
      state.error = error;
    },
    [changeRestaurant]: (state, { payload }) => {
      const { activeId } = payload;
      state.activeId = activeId;
    },
    [addReview.type]: (state, action) => {
      const { restId, reviewId } = action.payload;
      state.entities[restId].reviews.push(reviewId);
    }
  }
});

export default reducer;

export const activeRestaurantIdSelector = (state) => state.restaurants.activeId;
const restaurantsSelector = (state) => state.restaurants.entities;
const restaurantsStatusSelector = (state) => state.restaurants.status;

export const restaurantsListSelector = createSelector(
  restaurantsSelector,
  Object.values
);
export const restaurantSelector = (state, { id }) =>
  restaurantsSelector(state)[id];

export const restaurantsLoadedSelector = isLoaded(restaurantsStatusSelector);
export const shouldLoadRestaurantsSelector = shouldLoad(
  restaurantsStatusSelector
);