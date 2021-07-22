import produce from 'immer';
import { createSelector } from 'reselect';
import api from '../../api';
import { arrToMap } from '../utils';
import { 
  FAILURE,
  REQUEST,
  SUCCESS,
  idle,
  pending,
  fulfilled,
  rejected
} from '../constants';

export const ADD_REVIEW = 'ADD_REVIEW';
const LOAD_REVIEWS = 'LOAD_REVIEWS';

export const addReview = (review, resId) => ({
  type: ADD_REVIEW,
  payload: { review, resId },
  meta: { generateId: ['reviewId', 'userId'] },
});

export const loadReviews = (restId) => async (dispatch) => {
  dispatch(loadReviewsRequest(restId));

  try {
    const payload = await api.loadReviews(restId);
    dispatch(loadReviewsSuccess(payload, restId));
  } catch (error) {
    dispatch(loadReviewsFailure(error, restId));
  }
};

const loadReviewsRequest = (restId) => ({
  type: LOAD_REVIEWS + REQUEST,
  restId
})

const loadReviewsSuccess = (payload, restId) => ({
  type: LOAD_REVIEWS + SUCCESS,
  payload,
  restId
})

const loadReviewsFailure = (error, restId) => ({
  type: LOAD_REVIEWS + FAILURE,
  error,
  restId
})

const initialState = {
  status: idle,
  entities: {},
  error: null,
  restId: null
}

export default (state = initialState, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case ADD_REVIEW:
      const { review, reviewId, userId } = payload;
      const { text, rating } = review;
      return produce(state, (draft) => {
        draft.entities[reviewId] = { id: reviewId, userId, text, rating };
      });
    case LOAD_REVIEWS + REQUEST:
      return produce(state, (draft) => {
        draft.status = pending;
        draft.error = null;
      });
    case LOAD_REVIEWS + SUCCESS:
      return produce(state, (draft) => {
        draft.status = fulfilled;
        draft.entities = arrToMap(payload);
      });
    case LOAD_REVIEWS + FAILURE:
      return produce(state, (draft) => {
        draft.status = rejected;
        draft.error = error;
      });
    default:
      return state;
  }
};

export const reviewsSelector = (state) => state.reviews.entities;

export const reviewSelector = (state, { id }) => {
  console.log(reviewsSelector(state)[id])
  return reviewsSelector(state)[id]
};

export const reviewsLoadingSelector = (state) =>
  (state.reviews.status === idle || state.reviews.status === pending);

export const reviewsListSelector = createSelector(
  reviewsSelector,
  Object.values
);
