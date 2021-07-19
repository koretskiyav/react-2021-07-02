import { normalizedRestaurants } from '../../fixtures';

import { ADD_RESTARANT_REVIEW } from '../constants';
const defaultRestaurants = normalizedRestaurants.reduce(
  (acc, restaurant) => ({ ...acc, [restaurant.id]: restaurant }),
  {}
);
export default (restaurants = defaultRestaurants, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_RESTARANT_REVIEW: {
      debugger;
      const firstRestrantId = Object.keys(restaurants)[0];
      let resCopy = { ...restaurants };
      resCopy[firstRestrantId].reviews.push(payload.id);

      return resCopy;
    }
    default:
      return restaurants;
  }
};

export const restaurantsSelector = (state) => state.restaurants;
