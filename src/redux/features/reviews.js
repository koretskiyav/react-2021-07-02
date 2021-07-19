import { normalizedReviews } from '../../fixtures';

const defaultReviews = normalizedReviews.reduce(
  (acc, review) => ({ ...acc, [review.id]: review }),
  {}
);
export const CREATE_REVIEW = 'CREATE_REVIEW';

export const createReview = (values, restaurantId) => ({
  type: CREATE_REVIEW,
  payload: { values, restaurantId },
});
export default (reviews = defaultReviews, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_REVIEW:
      const {
        values: { reviewId, rating, text, userId },
      } = payload;

      return {
        ...reviews,
        [reviewId]: {
          id: reviewId,
          userId,
          text,
          rating,
        },
      };
    default:
      return reviews;
  }
};
export const reviewsSelector = (state) => state.reviews;
