import { normalizedRestaurants } from '../../fixtures';

export const ADD_RESTAURANT_REVIEW = 'ADD_RESTAURANT_REVIEW';

export const addRestaurantReview = (restaurantId, reviewId) => ({
  type: ADD_RESTAURANT_REVIEW,
  payload: { restaurantId, reviewId },
});

const defaultRestaurants = normalizedRestaurants.reduce(
  (acc, restaurant) => ({
    ...acc,
    [restaurant.id]: restaurant,
  }),
  {}
);

export default (restaurants = defaultRestaurants, action) => {
  const { type } = action;

  switch (type) {
    case ADD_RESTAURANT_REVIEW:
      const { restaurantId, reviewId } = action.payload;
      const newRestaurant = {
        ...restaurants[restaurantId],
        reviews: [...restaurants[restaurantId].reviews, reviewId],
      };

      return { ...restaurants, [restaurantId]: newRestaurant };
    default:
      return restaurants;
  }
};

export const restaurantsSelector = (state) => state.restaurants;
export const restaurantsItemSelector = (state, id) => state.restaurants[id];
