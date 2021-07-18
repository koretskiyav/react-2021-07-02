import { createSelector } from 'reselect';
import { orderSelector, amountProductSelector } from './features/order';
import { productsSelector, productSelector } from './features/products';
import { restaurantsSelector } from './features/restaurants';
import { userSelector } from './features/users';
import { reviewsSelector, restaurantReviewsSelector } from './features/reviews';

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
        subtotal: order[product.id] * product.price
      }))
);

export const totalSelector = createSelector(
  orderProductsSelector,
  (orderProducts) =>
    orderProducts.reduce((acc, { subtotal }) => acc + subtotal, 0)
);

export const restaurantsToArraySelector = createSelector(
  restaurantsSelector,
  (restaurants) =>
    Object.keys(restaurants).map((id) => restaurants[id])
);

export const userNameSelector = createSelector(
  userSelector,
  (user) => user?.name
);

export const currentProductSelector = createSelector(
  productSelector,
  (product) => product || {}
);

export const amountCurrentProductSelector = createSelector(
  amountProductSelector,
  (amount) => amount || 0
);

export const currentRestaurantReviewsSelector = createSelector(
  reviewsSelector,
  restaurantReviewsSelector,
  (reviews, restaurantReviews) =>
    restaurantReviews.map((reviewId) => reviews[reviewId])
);

