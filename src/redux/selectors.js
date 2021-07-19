import { createSelector } from 'reselect';
import { orderSelector } from './features/order';
import { productsSelector } from './features/products';
import { restaurantsSelector } from './features/restaurants';
import { reviewsSelector } from './features/reviews';

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

export const orderRestaurantsSelector = createSelector(
  restaurantsSelector,
  (restaurants) => 
    Object.keys(restaurants)
      .map(id => restaurants[id])
      // .sort((a, b) => a.name < b.name);
);

export const orderReviewsSelector = createSelector(
  reviewsSelector,
  (reviews) => 
    Object.keys(reviews)
      .map(id => reviews[id])
);

export const restaurantSelector = createSelector(
  restaurantsSelector,
  (state, props) => props.id, 
  (restaurants, id) => restaurants[id]
);

export const averageRatingSelector = createSelector(
  restaurantSelector,
  reviewsSelector,
  (restaurant, reviews) => {
    const total = restaurant.reviews.reduce((acc, id) => acc + reviews[id].rating, 0);

    return Math.round(total / restaurant.reviews.length);
  }
);
