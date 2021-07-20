import { ADD_REVIEW } from './reviews';
import { normalizedUsers } from '../../fixtures';
import { arrToMap } from '../utils';

export default (state = arrToMap(normalizedUsers), action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_REVIEW:
      const { review, userId } = payload;
      return {
        ...state,
        [userId]: { id: userId, name: review.name },
      };

    default:
      return state;
  }
};

export const usersSelector = (state) => state.users;
