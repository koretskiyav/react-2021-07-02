import { normalizedUsers } from '../../fixtures'
import { ADD_REVIEW } from './reviews.js'

const defaultUsers = normalizedUsers.reduce(
  (acc, user) => ({ ...acc, [user.id]: user }),
  {}
)

export default (users = defaultUsers, action) => {
  const { type, payload } = action

  switch (type) {
    case ADD_REVIEW:
      return {
        ...users,
        [payload.userId]: {
          id: payload.userId,
          name: payload.userName
        }
      }
    default:
      return users
  }
}

export const usersSelector = state => state.users