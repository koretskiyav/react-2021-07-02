import { normalizedRestaurants } from '../../fixtures';

import { ADD_REVIEW } from './reviews';

const defaultRestaurants = normalizedRestaurants.reduce(
  (acc, restaurants) => ({ ...acc, [restaurants.id]: restaurants }),
  {}
);

export default (restaurants = defaultRestaurants, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_REVIEW:
      const { id: reviewId, restaurantId } = payload;
      const newReviews = [...restaurants[restaurantId].reviews, reviewId];
      const newRestaurant = {
        ...restaurants[restaurantId],
        reviews: newReviews,
      };
      return { ...restaurants, [restaurantId]: newRestaurant };
    default:
      return restaurants;
  }
};

export const restaurantsSelector = (state) => state.restaurants;
