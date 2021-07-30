import { useCallback, useContext } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './basket.module.css';
import itemStyles from './basket-item/basket-item.module.css';
import BasketItem from './basket-item';
import Button from '../button';
import {
  orderProductsSelector,
  totalSelector,
  orderBasketsSelector,
} from '../../redux/selectors';
import { UserConsumer } from '../../contexts/user';
import moneyContext from '../../contexts/money';
import { requestBasket } from '../../redux/features/basket';
import { basketsStatusSelectors } from '../../redux/features/basket';

function Basket({
  title = 'Basket',
  total,
  orderProducts,
  pathname,
  orderBaskets,
  requestBasket,
  basketStatus,
}) {
  const { m } = useContext(moneyContext);

  const handleClick = useCallback(() => {
    requestBasket(orderBaskets);
  }, [orderBaskets, requestBasket]);

  if (!total) {
    return (
      <div className={styles.basket}>
        <h4 className={styles.title}>Select a meal from the list</h4>
      </div>
    );
  }

  return (
    <div className={styles.basket}>
      <h4 className={styles.title}>
        <UserConsumer>{({ name }) => `${name}'s ${title}`}</UserConsumer>
      </h4>
      {orderProducts.map(({ product, amount, subtotal }) => (
        <BasketItem
          product={product}
          amount={amount}
          key={product.id}
          subtotal={subtotal}
          basketStatus={basketStatus}
        />
      ))}
      <hr className={styles.hr} />
      <div className={itemStyles.basketItem}>
        <div className={itemStyles.name}>
          <p>Total</p>
        </div>
        <div className={itemStyles.info}>
          <p>{m(total)}</p>
        </div>
      </div>
      {pathname === '/checkout' ? (
        <Button
          disabled={basketStatus}
          onClick={() => handleClick()}
          primary
          block
        >
          checkout
        </Button>
      ) : (
        <Link to="/checkout">
          <Button primary block>
            checkout
          </Button>
        </Link>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    pathname: state.router.location.pathname,
    total: totalSelector(state),
    orderProducts: orderProductsSelector(state),
    orderBaskets: orderBasketsSelector(state),
    basketStatus: basketsStatusSelectors(state),
  };
};

const mapDispatchToProps = {
  requestBasket,
};

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
