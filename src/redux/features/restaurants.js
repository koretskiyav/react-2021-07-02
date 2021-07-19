import { normalizedRestaurants } from '../../fixtures';
const ADD_REVIEW='ADD_REVIEW';

const defaultRestaurants = normalizedRestaurants.reduce(
  (acc, restaurant) => ({ ...acc, [restaurant.id]: restaurant }),
  {}
);
export const addReview = (id, reviewId) => ({ type: ADD_REVIEW, payload: {id, reviewId } });

export default (restaurants = defaultRestaurants, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_REVIEW:
      return {...restaurants, 
        [payload.id]: {...restaurants[payload.id], reviews: [...restaurants[payload.id].reviews, payload.reviewId]}
      }
    default:
      return restaurants;
  }
};

export const restaurantsSelector = (state) => state.restaurants;
