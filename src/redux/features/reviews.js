import {
  createAction,
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import api from '../../api';
import { pending, fulfilled, rejected } from '../constants';

import { isLoaded, shouldLoad } from '../utils';

export const addReview = createAction('reviews/add', (review, restId) => ({
  payload: { review, restId },
  meta: { generateId: ['reviewId', 'userId'] },
}));

export const loadReviews = createAsyncThunk('reviews/load', api.loadReviews, {
  condition: (restId, { getState }) =>
    shouldLoadReviewsSelector(getState(), { restId }),
});

const Reviews = createEntityAdapter();

const initialState = Reviews.getInitialState({
  status: {},
  error: null,
});

const { reducer } = createSlice({
  name: 'reviews',
  initialState,
  extraReducers: {
    [loadReviews.pending]: (state, { meta }) => {
      state.status[meta.arg] = pending;
      state.error = null;
    },
    [loadReviews.fulfilled]: (state, action) => {
      state.status[action.meta.arg] = fulfilled;
      Reviews.addMany(state, action);
    },
    [loadReviews.rejected]: (state, { meta, error }) => {
      state.status[meta.arg] = rejected;
      state.error = error;
    },
    [addReview]: (state, { payload }) => {
      const { review, reviewId, userId } = payload;
      const { text, rating } = review;
      Reviews.addOne(state, { id: reviewId, userId, text, rating });
    },
  },
});

export default reducer;

export const reviewsSelector = (state) => state.reviews.entities;

export const reviewSelector = (state, { id }) => reviewsSelector(state)[id];
const reviewsStatusSelector = (state, { restId }) =>
  state.reviews.status[restId];
export const reviewsLoadedSelector = isLoaded(reviewsStatusSelector);
const shouldLoadReviewsSelector = shouldLoad(reviewsStatusSelector);
