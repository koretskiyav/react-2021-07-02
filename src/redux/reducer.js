import { connectRouter } from 'connected-react-router';

import order from './features/order';
import restaurants from './features/restaurants';
import products from './features/products';
import reviews from './features/reviews';
import users from './features/users';

import history from '../history';

export default {
  router: connectRouter(history),
  order,
  restaurants,
  products,
  reviews,
  users,
};
