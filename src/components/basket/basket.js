import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BasketItem from './basketItem';

import styles from './basket.module.css';

const Basket = ({ products, totalPrice }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <h3>Basket</h3>
      </div>
      <div className={styles.content}>
        <ul className={styles.list}>
          {products.map((product) => {
            return <BasketItem key={product.id} product={product} />;
          })}
        </ul>
      </div>
      {totalPrice !== 0 && (
        <div className={styles.total}>
          <span>Total:</span>
          <b>{totalPrice} $</b>
        </div>
      )}
    </div>
  );
};

Basket.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

const mapStateToProps = (state, props) => {
  const products = state.restaurants
    .flatMap((restaurant) => restaurant.menu)
    .reduce(
      (acc, product) => (acc = { ...acc, [product.id]: { ...product } }),
      {}
    );

  const orderedProducts = Object.entries(state.order).map(([id, amount]) => ({
    ...products[id],
    amount,
    subTotal: amount * products[id].price,
  }));

  const totalPrice = orderedProducts.reduce(
    (acc, { amount, price }) => (acc += amount * price),
    0
  );

  return {
    products: orderedProducts,
    totalPrice,
  };
};

export default connect(mapStateToProps)(Basket);
