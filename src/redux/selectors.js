import { createSelector } from 'reselect';
import { orderSelector } from './features/order';
import { restaurantsSelector } from './features/restaurants';

const productsSelector = createSelector(restaurantsSelector, (restaurants) =>
  restaurants.flatMap((restaurant) => restaurant.menu)
);

export const orderProductsSelector = createSelector(
  productsSelector,
  orderSelector,
  (products, order) =>
    Object.keys(order)
      .filter((productId) => order[productId] > 0)
      .map((productId) => products.find((product) => product.id === productId))
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
