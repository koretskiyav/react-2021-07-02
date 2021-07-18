import { v4 } from 'uuid';
import { ADD_REVIEW } from '../features/reviews';

export default () => (next) => (action) => {
  if (action.type === ADD_REVIEW) {
    action.payload.values = { ...action.payload.values, reviewId: v4(), userId: v4() }
  }

  next(action);
};
