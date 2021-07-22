import produce from 'immer';
import { ADD_REVIEW } from './reviews';
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
import api from '../../api';

const LOAD_USERS = 'LOAD_USERS';

export const loadUsers = () => async (dispatch) => {
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
  loaded: false,
  error: null,
};

export default produce((draft = initialState, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case LOAD_USERS + REQUEST:
      return { ...draft, status: pending, error: null };
    case LOAD_USERS + SUCCESS:
      return {
        ...draft,
        status: fulfilled,
        loaded: true,
        entities: { ...draft.entities, ...arrToMap(payload) },
      };
    case LOAD_USERS + FAILURE:
      return { ...draft, status: rejected, error };
    case ADD_REVIEW:
      const { review, userId } = payload;
      draft.entities[userId] = { id: payload.userId, name: review.name };
      break;
    default:
      return draft;
  }
});

export const usersSelector = (state) => state.users.entities;

export const usersLoadingSelector = (state) => state.users.status !== fulfilled;

export const usersNeedsLoadingSelector = (state) => !state.users.loaded;
