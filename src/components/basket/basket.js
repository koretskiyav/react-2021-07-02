import { useContext } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';

import styles from './basket.module.css';
import itemStyles from './basket-item/basket-item.module.css';
import BasketItem from './basket-item';
import Button from '../button';
import Loader from '../loader';
import { orderProductsSelector, totalSelector } from '../../redux/selectors';
import { addOrder, orderLoadingSelector } from '../../redux/features/order';
import { UserConsumer } from '../../contexts/user';
import moneyContext from '../../contexts/money';

function Basket({ title = 'Basket', total, orderProducts, addOrder, loading }) {
  const { m } = useContext(moneyContext);

  if (!total) {
    return (
      <div className={styles.basket}>
        <h4 className={styles.title}>Select a meal from the list</h4>
      </div>
    );
  }

  return (
    <div className={styles.basket}>
      {loading && (
        <div className={styles.loading}>
          <Loader />
        </div>
      )}
      <h4 className={styles.title}>
        <UserConsumer>{({ name }) => `${name}'s ${title}`}</UserConsumer>
      </h4>
      {orderProducts.map(({ product, amount, subtotal, restId }) => (
        <BasketItem
          product={product}
          amount={amount}
          key={product.id}
          subtotal={subtotal}
          restId={restId}
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
      <Switch>
        <Route path="/checkout">
          <Button primary block onClick={addOrder}>
            add order
          </Button>
        </Route>
        <Route>
          <Link to="/checkout">
            <Button primary block>
              go to checkout
            </Button>
          </Link>
        </Route>
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    total: totalSelector(state),
    orderProducts: orderProductsSelector(state),
    loading: orderLoadingSelector(state),
  };
};

const mapDispatchToProps = { addOrder };

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
