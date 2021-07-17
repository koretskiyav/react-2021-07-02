import { DECREMENT, INCREMENT, REMOVE } from '../constants';

// { [productId]: amount }
export default (orders = {}, action) => {
  const { type, payload: id } = action;

  switch (type) {
    case INCREMENT:
      return { ...orders, [id]: (orders[id] || 0) + 1 };
    case DECREMENT:
      if (!orders[id]) return orders;

      if (orders[id] && orders[id] === 1) {
        const newOrders = { ...orders };

        delete newOrders[id];

        return newOrders;
      }

      return { ...orders, [id]: (orders[id] || 0) - 1 };
    case REMOVE:
      const newOrders = { ...orders };

      delete newOrders[id];

      return newOrders;
    default:
      return orders;
  }
};
