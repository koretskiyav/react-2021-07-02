import { combineReducers } from 'redux';
import order from './order';
import basket from './basket';

export default combineReducers({
  order,
  basket,
  foo: () => 'bar',
});
