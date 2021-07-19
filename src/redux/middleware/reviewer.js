import { v4 as uuid } from 'uuid';

import { GET_FORM_VALUES, addNewReview } from '../features/reviews';
import { addNewUser } from '../features/users';
import { addRestaurantReview } from '../features/restaurants';

export default ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type !== GET_FORM_VALUES) {
      return next(action);
    }
    const { restaurantId, name, text, rating } = action.payload;

    const newUserId = uuid();
    const newReviewId = uuid();

    dispatch(addNewUser(newUserId, name));
    dispatch(addNewReview(newReviewId, newUserId, text, rating));
    dispatch(addRestaurantReview(restaurantId, newReviewId));
  };
