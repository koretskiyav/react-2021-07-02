import { normalizedRestaurants } from '../../fixtures';

export const CONNECT_REVIEW_AND_RESTAURANT = 'CONNECT_REVIEW_AND_RESTAURANT';
const defaultRestaurants = normalizedRestaurants.reduce(
  (acc, restaurant) => ({ ...acc, [restaurant.id]: restaurant }),
  {}
);

export default (restaurants = defaultRestaurants, action) => {
  const { type, payload } = action;

  switch (type) {
    case CONNECT_REVIEW_AND_RESTAURANT:
      const { reviewId, restaurantId } = payload;
      const updateReviews = {
        ...restaurants[restaurantId],
        reviews: [...restaurants[restaurantId].reviews, reviewId]
      };
      return { ...restaurants, [restaurantId]: updateReviews };
    default:
      return restaurants;
  }
};

export const restaurantsSelector = (state) => state.restaurants;
