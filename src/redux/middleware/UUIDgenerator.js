import { ADD_REVIEW } from '../features/reviews';

import { v4 as uuidv4 } from 'uuid';

export default (store) => (next) => (action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_REVIEW:
      const newPayload = {
        ...payload,
        id: uuidv4(),
        userId: uuidv4(),
      };
      return next({ type, payload: newPayload });
    default:
      return next(action);
  }
};
