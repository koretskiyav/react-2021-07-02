import { createNextState } from '@reduxjs/toolkit';
import { arrToMap, isLoaded, shouldLoad } from '../utils';
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
import { addReview } from './reviews';

const LOAD_USERS = 'LOAD_USERS';

export const loadUsers = () => async (dispatch, getState) => {
  const shouldLoad = shouldLoadUsersSelector(getState());

  if (!shouldLoad) return;

  dispatch({ type: LOAD_USERS + REQUEST });

  try {
    const payload = await api.loadUsers();
    dispatch({ type: LOAD_USERS + SUCCESS, payload });
  } catch (error) {
    dispatch({ type: LOAD_USERS + FAILURE, error });
  }
};

const initialState = {
  status: idle,
  entities: {},
  error: null,
};

export default createNextState((draft = initialState, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case LOAD_USERS + REQUEST: {
      draft.status = pending;
      draft.error = null;
      break;
    }
    case LOAD_USERS + SUCCESS: {
      draft.status = fulfilled;
      Object.assign(draft.entities, arrToMap(payload));
      break;
    }
    case LOAD_USERS + FAILURE: {
      draft.status = rejected;
      draft.error = error;
      break;
    }
    case addReview.type:
      const { review, userId } = payload;
      draft.entities[userId] = { id: payload.userId, name: review.name };
      break;
    default:
      return draft;
  }
});

export const usersSelector = (state) => state.users.entities;
const usersStatusSelector = (state) => state.users.status;
export const usersLoadedSelector = isLoaded(usersStatusSelector);
const shouldLoadUsersSelector = shouldLoad(usersStatusSelector);
