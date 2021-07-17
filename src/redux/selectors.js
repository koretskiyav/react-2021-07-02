import { createSelector } from 'reselect';
import { orderSelector } from './features/order';
import { productsSelector } from './features/products';
import { usersSelector } from './features/users';
import { reviewsSelector } from './features/reviews';
import { restaurantsSelector } from './features/restaurants';

export const orderProductsSelector = createSelector(
  productsSelector,
  orderSelector,
  (products, order) =>
    Object.keys(order)
      .filter((productId) => order[productId] > 0)
      .map((productId) => products[productId])
      .map((product) => ({
        product,
        amount: order[product.id],
        subtotal: order[product.id] * product.price,
      }))
);

export const totalSelector = createSelector(
  orderProductsSelector,
  (orderProducts) =>
    orderProducts.reduce((acc, { subtotal }) => acc + subtotal, 0)
);

export const amountSelector = createSelector(
  orderSelector,
  (orderProducts) => (id) => orderProducts[id]
);

export const productSelector = createSelector(
  productsSelector,
  (products) => (id) => products[id]
);

export const userSelector = createSelector(
  usersSelector,
  (users) => (id) => users[id]
);

export const reviewByRestaurantSelector = createSelector(
  restaurantsSelector,
  reviewsSelector,
  (restaurants, reviews) => (id) => {
    return Object.keys(reviews)
      .filter((key) => restaurants[id].reviews.includes(key))
      .reduce((obj, key) => {
        obj[key] = reviews[key];
        return obj;
      }, {});
  }
);
