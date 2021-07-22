import produce from 'immer';
import { ADD_REVIEW } from './reviews';
import api from '../../api';
import {FAILURE, fulfilled, REQUEST, SUCCESS} from '../constants';
import { arrToMap } from '../utils';

const LOAD_USERS = 'LOAD_USERS';

export default produce((draft = {}, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case ADD_REVIEW:
      const { review, userId } = payload;
      draft[userId] = { id: payload.userId, name: review.name };
      break;
    case LOAD_USERS + SUCCESS:
      return { ...arrToMap(payload), status: fulfilled, error: null };
    case LOAD_USERS + FAILURE:
      return { status: fulfilled, error };
    default:
      return draft;
  }
});

export const loadUsers = () => async (dispatch) => {
  dispatch({ type: LOAD_USERS + REQUEST });

  try {
    const payload = await api.loadUsers();
    dispatch({ type: LOAD_USERS + SUCCESS, payload });
  } catch (error) {
    dispatch({ type: LOAD_USERS + FAILURE, error });
  }
};

export const usersSelector = (state) => state.users;
