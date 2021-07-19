import { createSelector } from 'reselect';
import { orderSelector } from './features/order';
import { productsSelector } from './features/products';
import {
  restaurantsSelector,
  restaurantsItemSelector,
} from './features/restaurants';
import { reviewsItemSelector, reviewsSelector } from './features/reviews';
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

export const restaurantsListSelector = createSelector(
  restaurantsSelector,
  (restaurants) => Object.values(restaurants)
);

export const reviewSelector = createSelector(
  reviewsItemSelector,
  usersSelector,
  ({ id, userId, text, rating }, users) => {
    return {
      user: users[userId].name,
      text,
      rating,
    };
  }
);

export const averageRatingSelector = createSelector(
  restaurantsItemSelector,
  reviewsSelector,
  ({ reviews: restaurantReviews }, allReviews) => {
    const total = restaurantReviews.reduce(
      (averageRating, reviewId) =>
        (averageRating += allReviews[reviewId].rating),
      0
    );
    return Math.round(total / restaurantReviews.length);
  }
);
