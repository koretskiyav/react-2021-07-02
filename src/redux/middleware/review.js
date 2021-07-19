import { v4 as uuidv4 } from 'uuid';
import {addReview} from '../features/restaurants';
import {addUser} from '../features/users';


export default (store) => (next) => (action) => {
    if (action.type === 'CREATE_REVIEW') {
        const reviewId = uuidv4();
        const userId = uuidv4();
        const activeRestaurantId = store.getState().activeRestaurant;
        action.payload['id'] = reviewId; 
        action.payload['userId'] = userId; 

        store.dispatch(addReview(activeRestaurantId, reviewId));
        store.dispatch(addUser(userId, action.payload.name));
    }
    
    next(action);
  };
  