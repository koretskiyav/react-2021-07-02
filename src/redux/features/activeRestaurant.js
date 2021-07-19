import { normalizedRestaurants } from '../../fixtures';

const CHANGE_ACTIVE_RESTAURANT = 'CHANGE_ACTIVE_RESTAURANT';

export const changeActiveRestaurant = (id) => ({ type: CHANGE_ACTIVE_RESTAURANT, payload: id});

const defaultActualRestaurantId = normalizedRestaurants[0].id

export default (state, action) => {
    const { type, payload: id} = action;

    switch (type) {
        case CHANGE_ACTIVE_RESTAURANT:
            return id;
      default:
        return defaultActualRestaurantId ;
    }
  };