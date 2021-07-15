import { restaurants } from '../../fixtures';

const dishes = restaurants
.reduce((accumMenu, nextRestaurant) => ([ ...accumMenu, ...nextRestaurant.menu]), [])
.reduce((accumMenu, nextDish) => ({...accumMenu, [nextDish.id]: nextDish}), {});

// { [productId]: { id, name, price }}
export default (state = dishes, action) => {
const { type } = action;
  switch (type) {
    default:
      return state;
  }
};