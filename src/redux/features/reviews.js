import { normalizedReviews } from '../../fixtures';
import { ADD_REVIEW } from '../constants';
// id: '5909796d-5030-4e36-adec-68b8f9ec2d96',
//userId: 'a304959a-76c0-4b34-954a-b38dbf310360',
//text: 'Not bad',
//rating: 5

export const addreview = (id, userId, text, rating, name, restaurantId) => ({
  type: ADD_REVIEW,
  payload: { id, userId, text, rating, name, restaurantId },
});

const defaultReviews = normalizedReviews.reduce(
  (acc, review) => ({ ...acc, [review.id]: review }),
  {}
);
export default (reviews = defaultReviews, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_REVIEW: {
      return {
        ...reviews,
        [payload.id]: {
          id: payload.id,
          userId: payload.userId,
          text: payload.text,
          rating: payload.rating,
        },
      };
    }
    default:
      return reviews;
  }
};
export const reviewSelector = (state) => state.reviews;
