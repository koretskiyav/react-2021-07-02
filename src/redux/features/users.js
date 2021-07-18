import { normalizedUsers } from '../../fixtures';

const defaultUsers = normalizedUsers.reduce(
  (acc, User) => ({ ...acc, [User.id]: User }),
  {}
);
export default (users = defaultUsers, action) => {
  const { type } = action;

  switch (type) {
    default:
      return users;
  }
};
export const userSelector = (state) => state.users;
