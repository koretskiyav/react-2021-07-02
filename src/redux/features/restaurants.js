import { normalizedRestaurants } from '../../fixtures';
import { CREATE_REVIEW } from './reviews';

const defaultRestaurants = normalizedRestaurants.reduce(
  (acc, restaurant) => ({ ...acc, [restaurant.id]: restaurant }),
  {}
);

export default (restaurants = defaultRestaurants, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_REVIEW:
      const {
        restaurantId,
        values: { reviewId },
      } = payload;
      restaurants[restaurantId].reviews = [
        ...restaurants[restaurantId].reviews,
        reviewId,
      ];

      return restaurants;
    default:
      return restaurants;
  }
};

export const restaurantsSelector = (state) => state.restaurants;
