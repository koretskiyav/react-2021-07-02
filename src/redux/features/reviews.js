import api from '../../api';
import { normalizedReviews } from '../../fixtures';
import { FAILURE, REQUEST, SUCCESS } from '../constants';
import { arrToMap } from '../utils';

export const ADD_REVIEW = 'ADD_REVIEW';
const LOAD_REVIEWS = 'LOAD_REVIEWS';

export const addReview = (review, resId) => ({
  type: ADD_REVIEW,
  payload: { review, resId },
  meta: { generateId: ['reviewId', 'userId'] },
});

export const loadReviews = (restId) => async (dispatch) => {
  dispatch({ type: LOAD_REVIEWS + REQUEST, restId });

  try {
    const payload = await api.loadReviews(restId);
    dispatch({ type: LOAD_REVIEWS + SUCCESS, payload, restId });
  } catch (error) {
    dispatch({ type: LOAD_REVIEWS + FAILURE, error, restId });
  }
};

export default (state = arrToMap(normalizedReviews), action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_REVIEW:
      const { review, reviewId, userId } = payload;
      const { text, rating } = review;
      return {
        ...state,
        [reviewId]: { id: reviewId, userId, text, rating },
      };
    default:
      return state;
  }
};

export const reviewsSelector = (state) => state.reviews;

export const reviewSelector = (state, { id }) => reviewsSelector(state)[id];
