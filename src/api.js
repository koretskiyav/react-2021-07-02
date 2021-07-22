const get = (url) => fetch(url).then((res) => res.json());

export default {
  loadProducts: (restaurantId) => get(`/api/products?id=${restaurantId}`),
  loadRestaurants: () => get('/api/restaurants'),
  loadReviews: (restId) => get(`/api/reviews?id=${restId}`),
  loadUsers: () => get(`/api/users`),
};
