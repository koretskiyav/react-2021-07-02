import { normalizedUsers } from '../../fixtures';
import { ADDREVIEW } from './reviews';

const defaultUsers = normalizedUsers.reduce(
  (acc, user) => ({ ...acc, [user.id]: user }),
  {}
);

export default (users = defaultUsers, action) => {
  const { type } = action;

  switch (type) {
    case ADDREVIEW:
      const { name, userId } = action.payload.values;
      return {
        ...users,
        [userId]: { userId, name },
      };
    default:
      return users;
  }
};

export const usersSelector = (state) => state.users;
