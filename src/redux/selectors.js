import { createSelector } from 'reselect';
import { orderSelector } from './features/order';
import { productsSelector } from './features/products';
import { restaurantsSelector } from './features/restaurants';
import { reviewsSelector } from './features/reviews';
import { usersSelector } from './features/users';

const getIdFromProps = (state, props) => props.id;

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


export const getRestaurant = createSelector(
  restaurantsSelector,
  getIdFromProps,
  (restaurants, id) => restaurants[id]
);

export const getReviewsList = createSelector(
  restaurantsSelector,
  getIdFromProps,
  (restaurants, id) => restaurants[id].reviews
);

export const getAverageRating = createSelector(
  getReviewsList,
  reviewsSelector,
  (reviews, allReviews) => {
    let total = reviews
      .map((x) => allReviews[x].rating)
      .reduce((a, b) => a + b, 0);
    return Math.round(total / reviews.length);
  }
);

export const getReviewById = createSelector(
  reviewsSelector,
  getIdFromProps,
  (reviews, id) => reviews[id]
);

export const getUserFromReview = createSelector(
  usersSelector,
  getReviewById,
  (users, review) => users[review.userId]
);

export const getAmountProduct = createSelector(
  orderSelector,
  getIdFromProps,
  (order, id) => order[id] || 0
);

export const getProductById = createSelector(
  productsSelector,
  getIdFromProps,
  (products, id) => products[id]
);
