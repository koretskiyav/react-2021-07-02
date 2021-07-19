import { normalizedUsers } from '../../fixtures';

export const ADD_NEW_USER = 'ADD_NEW_USER';

export const addNewUser = (id, name) => ({
  type: ADD_NEW_USER,
  payload: { id, name },
});

const defaultUsers = normalizedUsers.reduce(
  (acc, user) => ({ ...acc, [user.id]: user }),
  {}
);

export default (users = defaultUsers, action) => {
  const { type } = action;

  switch (type) {
    case ADD_NEW_USER:
      const { id, name } = action.payload;
      return { ...users, [id]: { id, name } };
    default:
      return users;
  }
};

export const usersSelector = (state) => state.users;
