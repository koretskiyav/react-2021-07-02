import { useContext, useMemo } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import styles from './basket.module.css';
import itemStyles from './basket-item/basket-item.module.css';
import BasketItem from './basket-item';
import Button from '../button';
import { orderProductsSelector, totalSelector } from '../../redux/selectors';
import { UserConsumer } from '../../contexts/user';
import moneyContext from '../../contexts/money';
import { remove } from '../../redux/features/order'
import {
  processCheckout,
  checkoutSuccessSelector,
  checkoutErrorSelector,
  checkoutProcessingSelector
} from '../../redux/features/checkout'

function Basket({
  title = 'Basket',
  total,
  orderProducts,
  match,
  checkoutSuccess,
  checkoutError,
  checkoutProcessing,
  processCheckout,
  history
}) {
  const { m } = useContext(moneyContext);

  const onCheckoutPage = useMemo(() => (
    match.url === '/checkout'
  ), [match])

  const handleProcessCheckout = () => {
    const data = mapper(orderProducts);
    processCheckout(data);
  }

  const mapper = (items) => (
    items.map(item => ({
      id: item.product.id,
      amount: item.amount
    }))
  )
  
  if (checkoutSuccess) {
    remove();
    history.push('/checkout/success');
  }

  if (checkoutError) {
    history.push('/checkout/failure');
  }

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
        <Button
          primary
          block
          onClick={handleProcessCheckout}
          disabled={checkoutProcessing}
        >
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
    checkoutSuccess: checkoutSuccessSelector(state),
    checkoutError: checkoutErrorSelector(state),
    checkoutProcessing: checkoutProcessingSelector(state)
  };
};

const mapDispatchToProps = {
  processCheckout,
  remove
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Basket));
