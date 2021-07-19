import { normalizedUsers } from '../../fixtures';
import { ADD_USER } from '../constants';
export const addUser = (userId, name) => ({
  type: ADD_USER,
  payload: { userId, name },
});
const defaultUsers = normalizedUsers.reduce(
  (acc, User) => ({ ...acc, [User.id]: User }),
  {}
);
export default (users = defaultUsers, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_USER: {
      return {
        ...users,
        [payload.id]: {
          id: payload.id,
          name: payload.name,
        },
      };
    }

    default:
      return users;
  }
};
export const userSelector = (state) => state.users;
