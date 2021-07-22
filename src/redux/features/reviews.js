import api from '../../api';
import { FAILURE, REQUEST, SUCCESS } from '../constants';
import { arrToMap } from '../utils';

export const ADD_REVIEW = 'ADD_REVIEW';
const LOAD_REVIEWS = 'LOAD_REVIEWS';

export const addReview = (review, restId) => ({
  type: ADD_REVIEW,
  payload: { review, restId },
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

const initialValue = {
  reviewsWasLoadedFor: {},
  entities: {},
  error: null,
};

export default (state = initialValue, action) => {
  const { type, payload, restId, error } = action;

  switch (type) {
    case ADD_REVIEW:
      const { review, reviewId, userId } = payload;
      const { text, rating } = review;
      return {
        ...state,
        entities: {
          ...state.entities,
          [reviewId]: { id: reviewId, userId, text, rating },
        },
      };
    case LOAD_REVIEWS + REQUEST:
      return state;
    case LOAD_REVIEWS + SUCCESS:
      return {
        ...state,
        reviewsWasLoadedFor: { ...state.reviewsWasLoadedFor, [restId]: true },
        entities: { ...state.entities, ...arrToMap(payload) },
      };
    case LOAD_REVIEWS + FAILURE:
      return { ...state, error };
    default:
      return state;
  }
};

export const reviewsSelector = (state) => state.reviews.entities;

export const loadingReviewsSelector = (state, props) =>
  !state.reviews.reviewsWasLoadedFor[props.restId];

export const reviewSelector = (state, { id }) => reviewsSelector(state)[id];
