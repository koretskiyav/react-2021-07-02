import { normalizedUsers } from '../../fixtures';
import { ADD_REVIEW } from './reviews';

const defaultUsers = normalizedUsers.reduce(
  (acc, user) => ({ ...acc, [user.id]: user }),
  {}
)

export default (users = defaultUsers, action) => {
  const { type, payload } = action;

  switch (type) {
    case (ADD_REVIEW):
      const { values: { userId, name } } = payload;

      return { ...users, [userId]: {
          id: userId,
          name
        }
      }
    default:
      return users;
  }
};

export const userSelector = (state, props) => state.users[props.userId];
