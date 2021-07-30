const get = (url) =>
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error();
  });

const send = async (JSON) => {
  const res = await fetch('/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON,
  });

  if (res.status === 200) {
    return res.json();
  }
  if (res.status === 400) {
    const message = await res.json();
    throw new Error(message);
  }
};

export default {
  loadRestaurants: () => get('/api/restaurants'),
  loadProducts: (restId) => get(`/api/products?id=${restId}`),
  loadReviews: (restId) => get(`/api/reviews?id=${restId}`),
  loadUsers: () => get('/api/users'),
  sendOrder: (orderJSON) => send(orderJSON),
};
