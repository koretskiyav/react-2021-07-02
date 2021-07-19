import { normalizedReviews } from '../../fixtures';

export const ADD_REVIEW = 'ADD_REVIEW'

export const addReview = (payload) => ({
  type: ADD_REVIEW,
  payload
})

const defaultReviews = normalizedReviews.reduce(
  (acc, review) => ({ ...acc, [review.id]: review }),
  {}
) 

export default (reviews = defaultReviews, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_REVIEW:
      return {
        ...reviews,
        [payload.reviewId]: {
          id: payload.reviewId,
          userId: payload.userId,
          text: payload.comment,
          rating: payload.rating,
        }
      }
    default:
      return reviews;
  }
};

export const reviewsSelector = (state) => state.reviews
