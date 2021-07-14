import { useMemo } from 'react';
import { connect } from 'react-redux';

import BasketProduct from './basketProduct';

import styles from './basket.module.css';

const Basket = ({ restaurants, order }) => {
  const fullMenu = useMemo(() => {
    return restaurants
      .map((restaurant) => {
        return restaurant.menu;
      })
      .flat()
      .map((menu) => {
        return {
          count: order[menu.id] || 0,
          sum: (order[menu.id] || 0) * menu.price,
          ...menu,
        };
      });
  }, [restaurants, order]);

  const totalSum = useMemo(() => {
    return fullMenu.reduce((prev, menu) => {
      return prev + menu.sum;
    }, 0);
  }, [fullMenu]);

  return (
    <div>
      {fullMenu.map((product) =>
        product.count > 0 ? (
          <BasketProduct key={product.id} product={product} />
        ) : null
      )}
      <div className={styles.totalSum}>
        <h4 className={styles.title}>Total sum</h4>
        <div className={styles.price}>{totalSum} $</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  order: state.order,
});

export default connect(mapStateToProps)(Basket);
