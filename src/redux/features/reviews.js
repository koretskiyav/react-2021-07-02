import api from '../../api';
import { arrToMap } from '../utils';
import {
  idle,
  pending,
  fulfilled,
  rejected,
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../constants';
import produce from 'immer';

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
  entities: {
    restLoadingId: [],
    content: {},
  },
  error: null,
};

export default produce((draft = initialState, action) => {
  const { type, payload, error, restId } = action;

  switch (type) {
    case ADD_REVIEW:
      const { review, reviewId, userId } = payload;
      const { text, rating } = review;
      const newContent = [{ id: reviewId, userId, text, rating }];
      return {
        ...draft,
        entities: {
          restLoadingId: [...draft.entities.restLoadingId],
          content: { ...draft.entities.content, ...arrToMap(newContent) },
        },
      };
    case LOAD_REVIEWS + REQUEST:
      return { ...draft, status: pending, error: null };
    case LOAD_REVIEWS + SUCCESS:
      const newRestLoadingId = [...draft.entities.restLoadingId];
      const isResrId = newRestLoadingId.includes(restId);
      if (isResrId === false) {
        newRestLoadingId.push(restId);
      }
      return {
        ...draft,
        status: fulfilled,
        entities: {
          restLoadingId: newRestLoadingId,
          content: { ...draft.entities.content, ...arrToMap(payload) },
        },
      };
    case LOAD_REVIEWS + FAILURE:
      return { ...draft, status: rejected, error };
    default:
      return draft;
  }
});

export const reviewsSelector = (state) => state.reviews.entities.content;

export const reviewSelector = (state, { id }) => {
  return reviewsSelector(state)[id];
};

export const reviewsSelectorLoadingId = (state) =>
  state.reviews.entities.restLoadingId;

export const reviewsRestIdSelector = (state, { resId }) => resId;
