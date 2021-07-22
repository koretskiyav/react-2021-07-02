import produce from 'immer';
import { ADD_REVIEW } from './reviews';
import { arrToMap } from '../utils';
import api from '../../api';
import { REQUEST, SUCCESS } from '../constants';


const LOAD_USERS = 'LOAD_USERS';

export const loadUsers = async (dispatch) => {
  dispatch({type: LOAD_USERS + REQUEST});
  const users = await api.loadUsers();
  dispatch({type: LOAD_USERS + SUCCESS, payload: users});
};


export default produce((draft = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USERS:
    case LOAD_USERS + REQUEST:
      draft = [];
      break;
    case LOAD_USERS + SUCCESS:
      payload.forEach(user => draft[user.id] = user);
      break;
    case ADD_REVIEW:
      const { review, userId } = payload;
      draft[userId] = { id: payload.userId, name: review.name };
      break;
    default:
      return draft;
  }
});

export const usersSelector = (state) => state.users;
