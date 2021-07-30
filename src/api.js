const get = (url) =>
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error();
  });

export default {
  loadRestaurants: () => get('/api/restaurants'),
  loadProducts: (restId) => get(`/api/products?id=${restId}`),
  loadReviews: (restId) => get(`/api/reviews?id=${restId}`),
  loadUsers: () => get('/api/users'),
  requestBasket: (orderBaskets) =>
    fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderBaskets),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw res.json();
    }),
};
