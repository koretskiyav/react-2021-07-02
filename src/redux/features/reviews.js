import produce from 'immer';
import api from '../../api';
import {
  idle,
  pending,
  fulfilled,
  rejected,
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../constants';
import { arrToMap } from '../utils';
import { CHANGE_RESTAURANT } from './restaurants';

export const ADD_REVIEW = 'ADD_REVIEW';
const LOAD_REVIEWS = 'LOAD_REVIEWS';

export const addReview = (review, resId) => ({
  type: ADD_REVIEW,
  payload: { review, resId },
  meta: { generateId: ['reviewId', 'userId'] },
});

export const loadReviews = (resId) => async (dispatch) => {
  dispatch({ type: LOAD_REVIEWS + REQUEST, resId });

  try {
    const payload = await api.loadReviews(resId);
    dispatch({ type: LOAD_REVIEWS + SUCCESS, payload, resId });
  } catch (error) {
    dispatch({ type: LOAD_REVIEWS + FAILURE, error, resId });
  }
};

const initialState = {
  status: idle,
  entities: {},
  loaded: {},
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload, error, resId } = action;

  switch (type) {
    case CHANGE_RESTAURANT:
      return { ...state, status: idle, error: null };
    case LOAD_REVIEWS + REQUEST:
      return { ...state, status: pending, error: null };
    case LOAD_REVIEWS + SUCCESS:
      return {
        ...state,
        status: fulfilled,
        loaded: { ...state.loaded, [resId]: true },
        entities: { ...state.entities, ...arrToMap(payload) },
      };
    case LOAD_REVIEWS + FAILURE:
      return { ...state, status: rejected, error };
    case ADD_REVIEW:
      const { review, reviewId, userId } = payload;
      const { text, rating } = review;
      return produce(state, (draft) => {
        draft.entities[reviewId] = { id: reviewId, userId, text, rating };
      });
    default:
      return state;
  }
};

export const reviewsSelector = (state) => state.reviews.entities;

export const reviewSelector = (state, { id }) => reviewsSelector(state)[id];

export const reviewsLoadingSelector = (state) =>
  state.reviews.status !== fulfilled;

export const reviewsNeedsLoadingSelector = (state, { resId }) =>
  !state.reviews.loaded[resId];
