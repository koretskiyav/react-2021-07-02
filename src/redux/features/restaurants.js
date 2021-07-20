import { createSelector } from 'reselect';
import { ADD_REVIEW } from './reviews';
import { normalizedRestaurants } from '../../fixtures';
import { arrToMap } from '../utils';

export default (state = arrToMap(normalizedRestaurants), action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_REVIEW:
      const { resId, reviewId } = payload;

      const restaurant = state[resId];
      return {
        ...state,
        [resId]: {
          ...restaurant,
          reviews: [...restaurant.reviews, reviewId],
        },
      };

    default:
      return state;
  }
};

const restaurantsSelector = (state) => state.restaurants;

export const restaurantsListSelector = createSelector(
  restaurantsSelector,
  Object.values
);
export const restaurantSelector = (state, { id }) =>
  restaurantsSelector(state)[id];
