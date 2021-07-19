import { normalizedUsers } from '../../fixtures';

const ADD_USER = 'ADD_USER';

const defaultUsers = normalizedUsers.reduce(
  (acc, user) => ({ ...acc, [user.id]: user }),
  {}
);

export const addUser = (userId, name) => ({ type: ADD_USER, payload: { userId, name } });

export default (users = defaultUsers, action) => {
  const { type, payload } = action;

    switch(type) {
      case ADD_USER:
        return { ...users, [payload.userId]: { id: payload.userId, name: payload.name } }
      default:
        return users;
    }
};

export const usersSelector = (state) => state.users;
