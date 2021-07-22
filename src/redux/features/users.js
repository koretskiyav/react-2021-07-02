import produce from 'immer';
import { ADD_REVIEW } from './reviews';
import { arrToMap } from '../utils';
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
  error: null,
};

export default produce((draft = initialState, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case ADD_REVIEW:
      const { review, userId } = payload;
      draft.entities[userId] = { id: payload.userId, name: review.name };
      break;
    case LOAD_USERS + REQUEST:
      return { ...draft, status: pending, error: null };
    case LOAD_USERS + SUCCESS:
      return {
        ...draft,
        status: fulfilled,
        entities: {
          ...draft.entities,
          ...arrToMap(payload),
        },
      };
    case LOAD_USERS + FAILURE:
      return { ...draft, status: rejected, error };
    default:
      return draft;
  }
});

export const usersSelector = (state) => state.users.entities;
