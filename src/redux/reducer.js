import { combineReducers } from 'redux';
import order from './features/order';
import restaurants from './features/restaurants';

export default combineReducers({
  order,
  restaurants,
});
