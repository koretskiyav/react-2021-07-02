import { combineReducers } from 'redux';
import order from './order';
import dishes from './dishes';

export default combineReducers({
  order,
  dishes,
  foo: () => 'bar',
});
