import { normalizedUsers } from '../../fixtures';


export const CREATE_USER = 'CREATE_USER';

const defaultUsers = normalizedUsers.reduce(
  (acc, user) => ({ ...acc, [user.id]: user }),
  {}
);

export default (users = defaultUsers, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_USER:
      const { userId, name } = payload;
      return { ...users, [userId]: { id: userId, name: name } };
    default:
      return users;
  }
};

export const usersSelector = (state) => state.users;
