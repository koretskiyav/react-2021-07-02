import { createAction, createSelector, createReducer } from '@reduxjs/toolkit';
import { arrToMap, isLoaded, shouldLoad } from '../utils';
import api from '../../api';
import {
  idle,
  pending,
  fulfilled,
  rejected,
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../constants';
import { addReview } from './reviews';

export const changeRestaurant = createAction('restaurant/change');
export const loadRestaurants = createAction('restaurants/load', 
  () => ({meta: {
      apiCall: () => api.loadRestaurants(),
    }
  })
);

const initialState = {
  activeId: null,
  status: idle,
  entities: {},
  error: null,
};

export default createReducer (initialState, {
    [changeRestaurant.type]: (state, action) => ({ ...state, activeId: action.payload }),
    [loadRestaurants.type + REQUEST]: (state) => ({ ...state, status: pending, error: null }),
    [loadRestaurants.type + SUCCESS]: (state, action) => ({
        ...state,
        activeId: action.payload[0].id,
        status: fulfilled,
        entities: arrToMap(action.payload),
      }),
    [loadRestaurants.type + FAILURE]: (state, action) => ({ ...state, status: rejected, error: action.payload.error }),
    [addReview.type]: (state, action) => ({
        ...state, 
        entities: {
          ...state.entities, 
          [action.payload.restId]: {
            ...state.entities[action.payload.restId], 
            reviews: [...state.entities[action.payload.restId].reviews,action.payload.reviewId]
          }
        }
      })
  }
);

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
