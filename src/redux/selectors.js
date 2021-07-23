import { createSelector } from '@reduxjs/toolkit';
import { orderSelector } from './features/order';
import { productsSelector } from './features/products';
import { restaurantSelector } from './features/restaurants';
import { reviewSelector, reviewsSelector } from './features/reviews';
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

export const reviewWitUserSelector = createSelector(
  reviewSelector,
  usersSelector,
  (review, users) => ({
    ...review,
    user: users[review.userId]?.name,
  })
);

export const averageRatingSelector = createSelector(
  reviewsSelector,
  restaurantSelector,
  (reviews, restaurant) => {
    const ratings = restaurant.reviews.map((id) => reviews[id]?.rating || 0);
    return Math.round(
      ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length
    );
  }
);
