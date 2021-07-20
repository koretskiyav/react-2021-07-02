import produce from 'immer';
import { createSelector } from 'reselect';
import { ADD_REVIEW } from './reviews';
import { arrToMap } from '../utils';

const CHANGE_RESTAURANT = 'CHANGE_RESTAURANT';
const LOAD_RESTAURANTS = 'LOAD_RESTAURANTS';

export const changeRestaurant = (activeId) => ({
  type: CHANGE_RESTAURANT,
  payload: activeId,
});

export const loadRestaurants = () => ({
  type: LOAD_RESTAURANTS,
  meta: {
    apiCall: () => fetch('/api/restaurants').then((res) => res.json()),
  },
});

const initialState = {
  activeId: null,
  entities: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_RESTAURANT:
      return { ...state, activeId: payload };
    case LOAD_RESTAURANTS:
      return { ...state, activeId: payload[0].id, entities: arrToMap(payload) };
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

export const restaurantsListSelector = createSelector(
  restaurantsSelector,
  Object.values
);
export const restaurantSelector = (state, { id }) =>
  restaurantsSelector(state)[id];
