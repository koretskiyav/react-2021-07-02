import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import produce from 'immer';
import api from '../../api';
import { pending, fulfilled, rejected } from '../constants';

import { arrToMap, isLoaded, shouldLoad } from '../utils';

export const addReview = createAction('reviews/add', (review, restId) => ({
  payload: { review, restId },
  meta: { generateId: ['reviewId', 'userId'] },
}));

export const loadReviews = createAsyncThunk('reviews/load', api.loadReviews, {
  condition: (restId, { getState }) =>
    shouldLoadReviewsSelector(getState(), { restId }),
});

const initialState = {
  status: {},
  entities: {},
  error: null,
};

export default produce((draft = initialState, action) => {
  const { type, payload, error, meta } = action;

  switch (type) {
    case loadReviews.pending.type: {
      draft.status[meta.arg] = pending;
      draft.error = null;
      break;
    }
    case loadReviews.fulfilled.type: {
      draft.status[meta.arg] = fulfilled;
      Object.assign(draft.entities, arrToMap(payload));
      break;
    }
    case loadReviews.rejected.type: {
      draft.status[meta.arg] = rejected;
      draft.error = error;
      break;
    }
    case addReview.type:
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
