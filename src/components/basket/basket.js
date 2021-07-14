import { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BasketItem from './basketItem';

import styles from './basket.module.css';

const Basket = ({ products }) => {
  const totalPrice = useMemo(() => {
    return products.reduce((sum, [key, { amount, price }]) => {
      return (sum += amount * price);
    }, 0);
  }, [products]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <h3>Basket</h3>
      </div>
      <div className={styles.content}>
        <ul className={styles.list}>
          {products.map(([id, properties]) => {
            return <BasketItem key={id} product={{ id, ...properties }} />;
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
  products: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.object.isRequired,
      ]).isRequired
    ).isRequired
  ).isRequired,
};

const mapStateToProps = (state, props) => ({
  products: Object.entries(state.order || {}),
});

export default connect(mapStateToProps)(Basket);
