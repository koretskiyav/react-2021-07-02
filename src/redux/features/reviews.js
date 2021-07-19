import { normalizedReviews } from '../../fixtures';

export const GET_FORM_VALUES = 'GET_FORM_VALUES';
export const ADD_NEW_REVIEW = 'ADD_NEW_REVIEW';

export const addNewReview = (id, userId, text, rating) => ({
  type: ADD_NEW_REVIEW,
  payload: { id, userId, text, rating },
});

const defaultReviews = normalizedReviews.reduce(
  (acc, review) => ({ ...acc, [review.id]: review }),
  {}
);

export default (reviews = defaultReviews, action) => {
  const { type } = action;

  switch (type) {
    case ADD_NEW_REVIEW:
      const { payload } = action;
      return { ...reviews, [payload.id]: { ...payload } };
    default:
      return reviews;
  }
};

export const reviewsSelector = (state) => state.reviews;
export const reviewsItemSelector = (state, id) => state.reviews[id];
