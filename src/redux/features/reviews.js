import { normalizedReviews } from '../../fixtures';

export const CREATE_REVIEW = 'CREATE_REVIEW';

export const createReview = (values, restaurantId) => ({ type: CREATE_REVIEW, payload: values, restaurantId });

const defaultReviews = normalizedReviews.reduce(
  (acc, review) => ({ ...acc, [review.id]: review }),
  {}
);

export default (reviews = defaultReviews, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_REVIEW:
      const { reviewId, userId, text, rating } = payload;
      return {
        ...reviews, [reviewId]: {
          id: reviewId,
          rating,
          userId,
          text
        }
      };
    default:
      return reviews;
  }
};

export const reviewsSelector = (state) => state.reviews;
