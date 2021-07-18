import { normalizedRestaurants } from '../../fixtures';
import { ADD_REVIEW } from './reviews';

const defaultRestaurants = normalizedRestaurants.reduce(
  (acc, restaurant) => ({ ...acc, [restaurant.id]: restaurant }),
  {}
);

export default (restaurants = defaultRestaurants, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_REVIEW:
      const { restaurantId, values: { reviewId } } = payload;
      const newReviews = [ ...restaurants[restaurantId].reviews, reviewId ];
      const newRestaurants = {
        ...restaurants,
      };
      newRestaurants[restaurantId].reviews = newReviews;

      return newRestaurants;
    default:
      return restaurants;
  }
};

export const restaurantsSelector = (state) => state.restaurants;
