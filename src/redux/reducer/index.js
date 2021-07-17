import { combineReducers } from 'redux';
import order from './order';
import restaurants from './restaraunts';

export default combineReducers({
  order,
  restaurants,
});
