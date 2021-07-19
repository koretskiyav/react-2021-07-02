import { normalizedReviews } from '../../fixtures';

export const ADDREVIEW = 'ADDREVIEW';

export const addReview = (restaurantId, values) => ({
  type: ADDREVIEW,
  payload: { restaurantId, values },
});

const defaultReviews = normalizedReviews.reduce(
  (acc, review) => ({ ...acc, [review.id]: review }),
  {}
);

export default (reviews = defaultReviews, action) => {
  const { type } = action;

  switch (type) {
    case ADDREVIEW:
      const { id, rating, text, userId } = action.payload.values;
      return {
        ...reviews,
        [id]: { id, rating, text, userId },
      };
    default:
      return reviews;
  }
};

export const reviewsSelector = (state) => state.reviews;
