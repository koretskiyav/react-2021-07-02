import produce from 'immer';
import { ADD_REVIEW } from './reviews';
import { normalizedUsers } from '../../fixtures';
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

const LOAD_USERS = 'LOAD_USERS'

export const loadUsers = () => async (dispatch) => {
  console.log('load users')
  dispatch(loadUsersRequest())

  try {
    const payload = await api.loadUsers()
    console.log(payload)
    dispatch(loadUsersSuccess(payload))
  } catch (err) {
    dispatch(loadUsersFailure(err))
  }
}

const loadUsersRequest = () => ({
  type: LOAD_USERS + REQUEST
})

const loadUsersSuccess = (payload) => ({
  type: LOAD_USERS + SUCCESS,
  payload
})

const loadUsersFailure = (error) => ({
  type: LOAD_USERS + FAILURE,
  error
})

const initialState = {
  status: idle,
  entities: {},
  error: null,
}

export default produce((draft = initialState, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case ADD_REVIEW:
      const { review, userId } = payload;
      draft[userId] = { id: payload.userId, name: review.name };
      break;
    case LOAD_USERS + REQUEST:
      draft.status = pending;
      draft.error = null;
      break;
    case LOAD_USERS + SUCCESS:
      draft.status = fulfilled;
      draft.entities = arrToMap(payload);
      break;
    case LOAD_USERS + FAILURE:
      draft.status = rejected;
      draft.error = error;
    default:
      return draft;
  }
});

export const usersSelector = (state) => state.users.entities;
