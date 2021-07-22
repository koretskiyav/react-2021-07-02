import api from '../../api';
import {FAILURE, fulfilled, pending, rejected, REQUEST, SUCCESS} from '../constants';
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

export default (state = {}, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case ADD_REVIEW:
      const { review, reviewId, userId } = payload;
      const { text, rating } = review;
      return {
        ...state,
        [reviewId]: { id: reviewId, userId, text, rating },
      };
    case LOAD_REVIEWS + REQUEST:
      return { ...state, status: pending, error: null };
    case LOAD_REVIEWS + SUCCESS:
      return { ...state,  status: fulfilled, error: null , ...arrToMap(payload) };
    case LOAD_REVIEWS + FAILURE:
      return { ...state, status: rejected, error };
    default:
      return state;
  }
};

export const reviewsSelector = (state) => state.reviews;

export const reviewSelector = (state, { id }) => reviewsSelector(state)[id];
