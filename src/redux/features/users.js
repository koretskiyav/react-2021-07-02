import produce from 'immer';
import { ADD_REVIEW } from './reviews';
import { arrToMap } from '../utils';
import { FAILURE, REQUEST, SUCCESS } from '../constants';
import api from '../../api';
import { createSelector } from 'reselect';

export const LOAD_USERS = 'LOAD_USERS';

export const loadUsers = () => async (dispatch) => {
  dispatch({ type: LOAD_USERS + REQUEST });

  try {
    const payload = await api.loadUsers();
    dispatch({ type: LOAD_USERS + SUCCESS, payload });
  } catch (error) {
    dispatch({ type: LOAD_USERS + FAILURE, error });
  }
};

export default produce((draft = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_REVIEW:
      const { review, userId } = payload;
      draft[userId] = { id: payload.userId, name: review.name };
      break;
    case LOAD_USERS + REQUEST:
      break;
    case LOAD_USERS + SUCCESS:
      return (draft = arrToMap(payload));
    default:
      return draft;
  }
});

export const usersSelector = (state) => state.users;

export const loadingUsersSelector = createSelector(
  usersSelector,
  (users) => !Object.values(users).length
);
