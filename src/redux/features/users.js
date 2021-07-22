import produce from 'immer';
//import { normalizedUsers } from '../../fixtures';
import { idle, fulfilled, REQUEST, SUCCESS, FAILURE } from '../constants';
import api from '../../api';
import { arrToMap } from '../utils';

const LOAD_USERS = 'LOAD_USERS';

export const loadUsers = () => async (dispatch) => {
  dispatch({ type: LOAD_USERS + REQUEST });
  try {
    const payload = await api.loadUsers();
    console.log('payload' + payload);
    dispatch({ type: LOAD_USERS + SUCCESS, payload });
  } catch (error) {
    console.log('NO payload');
    dispatch({ type: LOAD_USERS + FAILURE, error });
  }
};

const initialState = {
  status: idle,
  entities: null,
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USERS + SUCCESS: {
      console.log(payload);
      return {
        ...state,
        status: fulfilled,
        entities: payload,
      };
    }

    default:
      return state;
  }
};

export const usersSelector = (state) =>
  state.users.entities ? arrToMap(state.users?.entities) : null;

export const userLoadingSelector = (state) => state.users.status !== fulfilled;
export const userSelector = (state, { id }) => {
  if (state.reviews.status === idle) return undefined;
  return arrToMap(usersSelector(state))[id];
};
