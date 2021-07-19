import { normalizedRestaurants } from '../../fixtures';
import { ADD_REVIEW } from './reviews'

const defaultRestaurants = normalizedRestaurants.reduce(
  (acc, restaurant) => ({ ...acc, [restaurant.id]: restaurant}),
  {}
)

export default (restaurants = defaultRestaurants, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_REVIEW:
      return {
        ...restaurants,
        [payload.restaurantId]: {
          ...restaurants[payload.restaurantId],
          reviews: [
            ...restaurants[payload.restaurantId].reviews,
            payload.reviewId
          ]
        }
      }
    default:
      return restaurants;
  }
};

export const restaurantsSelector = (state) => state.restaurants;
