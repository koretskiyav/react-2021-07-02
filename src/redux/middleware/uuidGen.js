import { v4 as uuidv4 } from 'uuid'
import { ADD_REVIEW } from '../features/reviews'

export default (store) => (next) => (action) => {

  if (action.type = ADD_REVIEW) {
    action.payload.userId = uuidv4()
    action.payload.reviewId = uuidv4()
  }

  next(action)
}