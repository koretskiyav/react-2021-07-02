import { useContext } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';

import styles from './basket.module.css';
import itemStyles from './basket-item/basket-item.module.css';
import BasketItem from './basket-item';
import Button from '../button';
import { orderProductsSelector, totalSelector } from '../../redux/selectors';
import { UserConsumer } from '../../contexts/user';
import moneyContext from '../../contexts/money';
import { sendOrder } from '../../redux/features/order';

import { idsDictionarySelector } from '../../redux/selectors';

function Basket({
  title = 'Basket',
  total,
  orderProducts,
  idsDictionary,
  sendOrder,
}) {
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
      <h4 className={styles.title}>
        <UserConsumer>{({ name }) => `${name}'s ${title}`}</UserConsumer>
      </h4>
      {orderProducts.map(({ product, amount, subtotal }) => (
        <BasketItem
          product={product}
          amount={amount}
          key={product.id}
          restId={idsDictionary[product.id]}
          subtotal={subtotal}
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
        <Route path="/checkout" exact>
          <Button primary block onClick={sendOrder}>
            checkout
          </Button>
        </Route>
        <Route path="/">
          <Link to="/checkout">
            <Button primary block>
              checkout
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
    idsDictionary: idsDictionarySelector(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  sendOrder: () => dispatch(sendOrder(null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
