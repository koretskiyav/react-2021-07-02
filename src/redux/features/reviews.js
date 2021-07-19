import { normalizedReviews } from '../../fixtures';

export const REVIEW_CREATED = 'REVIEW_CREATED';

const defaultReviews = normalizedReviews.reduce(
  (acc, review) => ({...acc, [review.id]: review}),
  {}
);

export default (reviews = defaultReviews, action) => {
  const { type } = action;
  switch (type) {
    case REVIEW_CREATED: 
      const { id, userId, text, rating } = action.payload;
      return {... reviews, [id]: { id, userId, text, rating }};
    default:
      return reviews;
  }
};

export const reviewsSelector = (state) => state.reviews;

export const createReview = (payload) => ({ type: REVIEW_CREATED, payload });