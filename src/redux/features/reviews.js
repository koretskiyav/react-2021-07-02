import { normalizedReviews } from '../../fixtures';

const CREATE_REVIEW = 'CREATE_REVIEW';

export const createReview = (values) => ({ type: CREATE_REVIEW, payload: values });

const defaultReviews = normalizedReviews.reduce(
  (acc, review) => ({ ...acc, [review.id]: review }),
  {}
);

export default (reviews = defaultReviews, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_REVIEW:
      return { ...reviews, [payload.id]: {...payload} }
    default:
      return reviews;
  }
};

export const reviewsSelector = (state) => state.reviews;
