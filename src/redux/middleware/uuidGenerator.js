import { v4 as uuidv4 } from 'uuid';
import { REVIEW_CREATED } from '../features/reviews';

export default (store) => (next) => (action) => {
  // console.log('before: ', store.getState());
  // console.log('action: ', action);
  
  if (action.type === REVIEW_CREATED) {
    action.payload.id = uuidv4(); 
    action.payload.userId = uuidv4(); 
  }
  next(action);
  // console.log('after: ', store.getState());
};
