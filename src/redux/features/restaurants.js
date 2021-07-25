import {
  createAction,
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
  createSelector,
  createNextState
} from '@reduxjs/toolkit';
import { isLoaded, shouldLoad } from '../utils';
import api from '../../api';
import { idle, pending, fulfilled, rejected } from '../constants';
import { addReview } from './reviews';


export const changeRestaurant = createAction('restaurant/change', (activeId) => ({
  payload: { activeId }
}));

export const loadRestaurants = createAsyncThunk('restaurants/load', api.loadRestaurants);
const Restaurants = createEntityAdapter();

const initialState = Restaurants.getInitialState({
  activeId: null,
  status: idle,
  entities: {},
  error: null,
});

const { reducer } = createSlice({
  name: 'restaurants',
  initialState,
  extraReducers: {
    [changeRestaurant]: (state, { payload }) => {
      state.activeId = payload.activeId;
    },
    [loadRestaurants.pending]: (state, action) => {
      state.status = pending;
      state.error = null;
    },
    [loadRestaurants.fulfilled]: (state, action) => {
      state.status = fulfilled;
      state.activeId = action.payload[0].id, // eslint-disable-line  no-unused-expressions
      Restaurants.addMany(state, action);
    },
    [loadRestaurants.rejected]: (state, { error }) => {
      state.status = rejected;
      state.error = error;
    },
    [addReview]: (state, { payload }) => {
      return createNextState(state, (draft) => {
        draft.entities[payload.restId].reviews.push(payload.reviewId);
      })
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
