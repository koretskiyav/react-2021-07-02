import { normalizedReviews } from '../../fixtures';

export const ADD_REVIEW = 'ADD_REVIEW';

export const addReview = (values, restaurantId) => ({
  type: ADD_REVIEW,
  payload: { values, restaurantId }
});

const defaultReviews = normalizedReviews.reduce(
  (acc, review) => ({ ...acc, [review.id]: review }),
  {}
);

export default (reviews = defaultReviews, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_REVIEW:
      const { values: { reviewId, rating, text, userId } } = payload;

      return {
        ...reviews, [payload.values.reviewId]: {
          id: reviewId,
          userId,
          text,
          rating
        }
      };
    default:
      return reviews;
  }
};

export const reviewsSelector = (state) => state.reviews;

export const restaurantReviewsSelector = (state, props) => props.restaurant.reviews;
