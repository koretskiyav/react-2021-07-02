import { normalizedReviews } from '../../fixtures';

export const ADD_REVIEW = 'ADD_REVIEW';

export const addReview = (review, restaurantId) => ({
  type: ADD_REVIEW,
  payload: { ...review, restaurantId },
});

const defaultReviews = normalizedReviews.reduce(
  (acc, reviews) => ({ ...acc, [reviews.id]: reviews }),
  {}
);

export default (reviews = defaultReviews, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_REVIEW:
      const { restaurantId, ...review } = payload;
      return { ...reviews, [review.id]: review };
    default:
      return reviews;
  }
};

export const reviewsSelector = (state) => state.reviews;

export const restaurantReviewsSelector = (state, props) => props.reviews;
