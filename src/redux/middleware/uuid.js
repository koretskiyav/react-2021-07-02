import { v4 as uuidv4 } from 'uuid';
import { CREATE_USER } from '../features/users';
import { CREATE_REVIEW } from '../features/reviews';
import { CONNECT_REVIEW_AND_RESTAURANT } from '../features/restaurants';

export default (store) => (next) => (action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_REVIEW:
      const updatedPayload = {
        ...payload,
        reviewId: uuidv4(),
        userId: uuidv4(),
        restaurantId: action.restaurantId
      };
      next({ type: CREATE_USER, payload: updatedPayload });
      next({ type: CREATE_REVIEW, payload: updatedPayload });
      next({ type: CONNECT_REVIEW_AND_RESTAURANT, payload: updatedPayload });
      break;
    default:
      return next(action);
  }

  console.log('after: ', store.getState());
};