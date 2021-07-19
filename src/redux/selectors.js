import { createSelector } from 'reselect';
import { orderSelector } from './features/order';
import { productIdSelector, productsSelector } from './features/products';
import { restaurantsSelector } from './features/restaurants';
import { restaurantReviewsSelector, reviewsSelector } from './features/reviews';
import { usersSelector } from './features/users';

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

export const restaurantsArraySelector = createSelector(
  restaurantsSelector,
  reviewsSelector,
  (restaurants, reviews) =>
    Object.keys(restaurants).map((id) => ({
      ...restaurants[id],
      reviews: restaurants[id].reviews.map((id) => reviews[id]),
    }))
);

export const activeRestaurantReviewsSelector = createSelector(
  reviewsSelector,
  restaurantReviewsSelector,
  usersSelector,
  (reviews, restaurants_reviews, users) =>
    restaurants_reviews.map((review) => ({
      ...reviews[review.id],
      user: users[reviews[review.id].userId].name,
    }))
);

export const productSelector = createSelector(
  productsSelector,
  productIdSelector,
  (products, id) => products[id]
);

export const amountSelector = createSelector(
  orderSelector,
  productIdSelector,
  (order, id) => order[id] || 0
);
