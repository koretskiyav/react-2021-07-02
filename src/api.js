const get = (url) => fetch(url).then((res) => res.json());

export default {
  loadRestaurants: () => get('/api/restaurants'),
  loadProducts: (restId) => get(`/api/products?id=${restId}`),
  loadReviews: (restId) => get(`/api/reviews?id=${restId}`),
  loadUsers: () => get('/api/users'),
};
