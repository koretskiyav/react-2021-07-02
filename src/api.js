const buildParams = (data) => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

const handleResponse = async (res) => {
  const data = await res.json();

  if (!res.ok) throw data;

  return data;
};

const get = (url) => fetch(url).then(handleResponse);
const post = (url, data) => fetch(url, buildParams(data)).then(handleResponse);

export default {
  loadRestaurants: () => get('/api/restaurants'),
  loadProducts: (restId) => get(`/api/products?id=${restId}`),
  loadReviews: (restId) => get(`/api/reviews?id=${restId}`),
  loadUsers: () => get('/api/users'),
  addOrder: (order) => post('/api/order', order),
};
