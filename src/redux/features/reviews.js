import api from '../../api';
import { arrToMap } from '../utils';
import { idle, fulfilled, REQUEST, SUCCESS, FAILURE } from '../constants';
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
const initialState = {
  status: idle,
  entities: null,
  error: null,
};
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_REVIEWS + SUCCESS: {
      return {
        ...state,
        status: fulfilled,
        entities: payload,
      };
    }
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

export const reviewsSelector = (state) => state.reviews?.entities;

export const reviewLoadingSelector = (state) =>
  state.reviews.status !== fulfilled;
export const reviewSelector = (state, { id }) => {
  if (state.reviews.status === idle) return undefined;
  return arrToMap(reviewsSelector(state))[id];
};
