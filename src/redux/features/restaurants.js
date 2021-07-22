import produce from 'immer';
import { createSelector } from 'reselect';
import { ADD_REVIEW } from './reviews';
import { arrToMap } from '../utils';
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

const LOAD_RESTAURANTS = 'LOAD_RESTAURANTS';
const CHANGE_RESTAURANT = 'CHANGE_RESTAURANT';

export const changeRestaurant = (activeId) => ({
  type: CHANGE_RESTAURANT,
  payload: activeId,
});

export const loadRestaurants = () => ({
  type: LOAD_RESTAURANTS,
  meta: {
    apiCall: () => api.loadRestaurants(),
  },
});

const initialState = {
  activeId: null,
  status: idle,
  entities: {},
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case CHANGE_RESTAURANT:
      return { ...state, activeId: payload };
    case LOAD_RESTAURANTS + REQUEST:
      return { ...state, status: pending, error: null };
    case LOAD_RESTAURANTS + SUCCESS:
      return {
        ...state,
        activeId: payload[0].id,
        status: fulfilled,
        entities: arrToMap(payload),
      };
    case LOAD_RESTAURANTS + FAILURE:
      return { ...state, status: rejected, error };
    case ADD_REVIEW:
      return produce(state, (draft) => {
        draft.entities[payload.resId].reviews.push(payload.reviewId);
      });

    default:
      return state;
  }
};

export const activeRestaurantIdSelector = (state) => state.restaurants.activeId;

const restaurantsSelector = (state) => state.restaurants.entities;

export const restaurantsLoadingSelector = (state) =>
  state.restaurants.status !== fulfilled;

export const restaurantsListSelector = createSelector(
  restaurantsSelector,
  Object.values
);
export const restaurantSelector = (state, { id }) =>
  restaurantsSelector(state)[id];
