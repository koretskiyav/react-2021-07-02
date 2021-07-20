import produce from 'immer';
import { ADD_REVIEW } from './reviews';
import { normalizedUsers } from '../../fixtures';
import { arrToMap } from '../utils';

export default produce((draft = arrToMap(normalizedUsers), action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_REVIEW:
      const { review, userId } = payload;
      draft[userId] = { id: payload.userId, name: review.name };
      break;
    default:
      return draft;
  }
});

export const usersSelector = (state) => state.users;
