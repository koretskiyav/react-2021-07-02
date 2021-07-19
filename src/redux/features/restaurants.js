import { normalizedRestaurants } from '../../fixtures';
import { ADDREVIEW } from './reviews';

const defaultRestaurants = normalizedRestaurants.reduce(
  (acc, restaurant) => ({ ...acc, [restaurant.id]: restaurant }),
  {}
);

export default (restaurants = defaultRestaurants, action) => {
  const { type } = action;

  switch (type) {
    case ADDREVIEW:
      const { restaurantId } = action.payload;
      const { id } = action.payload.values;
      const newRestaurants = { ...restaurants };
      newRestaurants[restaurantId]?.reviews.push(id);
      return {
        ...newRestaurants,
      };
    default:
      return restaurants;
  }
};

export const restaurantsSelector = (state) => state.restaurants;
