import { ADD_REVIEW, ADD_USER, ADD_RESTARANT_REVIEW } from '../constants';

const uuidv4 = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

export default (store) => (next) => (action) => {
  // console.log('before: ', store.getState());
  // console.log('action: ', action);
  //{ id, userId, text, rating }
  const {
    type,
    payload: { text, rating, name },
  } = action;
  const newUserId = uuidv4();
  const newReviewId = uuidv4();
  switch (type) {
    case ADD_REVIEW: {
      next({
        type: ADD_USER,
        payload: { id: newUserId, name: name },
      });
      next({
        ...action,
        payload: { id: newReviewId, userId: newUserId, text, rating },
      });
      next({
        type: ADD_RESTARANT_REVIEW,
        payload: { id: newReviewId, restaruntId: '' },
      });
      break;
    }
    default:
      next(action);

    // console.log('after: ', store.getState());
  }
};
