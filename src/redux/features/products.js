import { normalizedProducts } from '../../fixtures';

const defaultProducts = normalizedProducts.reduce(
  (acc, product) => ({ ...acc, [product.id]: product }),
  {}
);

export default (products = defaultProducts, action) => {
  const { type } = action;

  switch (type) {
    default:
      return products;
  }
};

export const productsSelector = (state) => state.products;

export const productSelector = (state, props) => state.products[props.id];
