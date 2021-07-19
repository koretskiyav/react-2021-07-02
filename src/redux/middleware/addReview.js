import { v4 as uuidv4 } from 'uuid';
import { ADDREVIEW } from '../features/reviews';

export default (store) => (next) => (action) => {
  if (action.type === ADDREVIEW) {
    action.payload.values = {
      ...action.payload.values,
      id: uuidv4(),
      userId: uuidv4(),
    };
  }
  next(action);
};
