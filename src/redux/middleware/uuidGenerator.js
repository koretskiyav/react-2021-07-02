import { v4 as uuidv4 } from 'uuid';
import { CREATE_REVIEW } from '../features/reviews';

export default () => (next) => (action) => {
  if (action.type === CREATE_REVIEW) {
    action.payload.values = {
      ...action.payload.values,
      reviewId: uuidv4(),
      userId: uuidv4(),
    };
  }
  next(action);
};
