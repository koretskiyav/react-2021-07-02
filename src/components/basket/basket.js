import { useContext, useMemo } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';

import styles from './basket.module.css';
import itemStyles from './basket-item/basket-item.module.css';
import BasketItem from './basket-item';
import Button from '../button';
import { orderProductsSelector, totalSelector } from '../../redux/selectors';
import { UserConsumer } from '../../contexts/user';
import moneyContext from '../../contexts/money';
import {
  processOrder,
  orderSuccessSelector,
  orderErrorSelector
} from '../../redux/features/order'

function Basket({
  title = 'Basket',
  total,
  orderProducts,
  match,
  processOrder
}) {
  const { m } = useContext(moneyContext);

  const onCheckoutPage = useMemo(() => (
    match.url === '/checkout'
  ), [match])

  const handleProcessOrder = () => {
    const data = mapper(orderProducts)
    processOrder(data)
  }

  const mapper = (products) => (
    Object.keys(products)
      .map(key => ({
        id: key,
        amount: products[key]
      }))
  )
    
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
      {onCheckoutPage ? (
        <Button primary block onClick={handleProcessOrder}>
          checkout
        </Button>
      ) : (
        <Link to="/checkout">
          <Button primary block>
            to checkout
          </Button>
        </Link>
      )}
      
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    total: totalSelector(state),
    orderProducts: orderProductsSelector(state),
    orderSuccess: orderSuccessSelector(state),
    orderError: orderErrorSelector(state),
  };
};

const mapDispatchToProps = {
  processOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Basket));
