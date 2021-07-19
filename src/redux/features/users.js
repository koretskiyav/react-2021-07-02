import { normalizedUsers } from '../../fixtures';

import { ADD_REVIEW } from './reviews';

const defaultUsers = normalizedUsers.reduce(
  (acc, users) => ({ ...acc, [users.id]: users }),
  {}
);

export default (users = defaultUsers, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_REVIEW:
      const { name, userId } = payload;
      return { ...users, [userId]: { id: userId, name: name } };
    default:
      return users;
  }
};

export const usersSelector = (state) => state.users;
