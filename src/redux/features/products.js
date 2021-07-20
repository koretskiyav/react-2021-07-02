import { normalizedProducts } from '../../fixtures';
import { arrToMap } from '../utils';

export default (state = arrToMap(normalizedProducts), action) => {
  const { type } = action;

  switch (type) {
    default:
      return state;
  }
};

export const productsSelector = (state) => state.products;

export const productSelector = (state, { id }) => productsSelector(state)[id];
