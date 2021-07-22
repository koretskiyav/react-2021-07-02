const get = (url) => fetch(url).then((res) => res.json());

export default {
  loadRestaurants: () => get('/api/restaurants'),
  loadReviews: (restId) => get(`/api/reviews?id=${restId}`),
  loadProducts: (restId) => get(`/api/products?id=${restId}`),
  loadUsers: () => get(`/api/users`),
};
