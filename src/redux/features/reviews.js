import produce from 'immer';
import api from '../../api';
import {
  pending,
  fulfilled,
  rejected,
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../constants';

import { arrToMap, isLoaded, shouldLoad } from '../utils';

export const ADD_REVIEW = 'ADD_REVIEW';
const LOAD_REVIEWS = 'LOAD_REVIEWS';

export const addReview = (review, restId) => ({
  type: ADD_REVIEW,
  payload: { review, restId },
  meta: { generateId: ['reviewId', 'userId'] },
});

export const loadReviews = (restId) => async (dispatch, getState) => {
  const shouldLoad = shouldLoadReviewsSelector(getState(), { restId });

  if (!shouldLoad) return;
  dispatch({ type: LOAD_REVIEWS + REQUEST, meta: { restId } });

  try {
    const payload = await api.loadReviews(restId);
    dispatch({ type: LOAD_REVIEWS + SUCCESS, payload, meta: { restId } });
  } catch (error) {
    dispatch({ type: LOAD_REVIEWS + FAILURE, error, meta: { restId } });
  }
};

const initialState = {
  status: {},
  entities: {},
  error: null,
};

export default produce((draft = initialState, action) => {
  const { type, payload, error, meta } = action;

  switch (type) {
    case LOAD_REVIEWS + REQUEST: {
      draft.status[meta.restId] = pending;
      draft.error = null;
      break;
    }
    case LOAD_REVIEWS + SUCCESS: {
      draft.status[meta.restId] = fulfilled;
      Object.assign(draft.entities, arrToMap(payload));
      break;
    }
    case LOAD_REVIEWS + FAILURE: {
      draft.status[meta.restId] = rejected;
      draft.error = error;
      break;
    }
    case ADD_REVIEW:
      const { review, reviewId, userId } = payload;
      const { text, rating } = review;
      draft.entities[reviewId] = { id: reviewId, userId, text, rating };
      break;
    default:
      return draft;
  }
});

export const reviewsSelector = (state) => state.reviews.entities;

export const reviewSelector = (state, { id }) => reviewsSelector(state)[id];
const reviewsStatusSelector = (state, { restId }) =>
  state.reviews.status[restId];
export const reviewsLoadedSelector = isLoaded(reviewsStatusSelector);
const shouldLoadReviewsSelector = shouldLoad(reviewsStatusSelector);
