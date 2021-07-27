import { connect } from 'react-redux';

import styles from './basket.module.css';
import itemStyles from './basket-item/basket-item.module.css';
import BasketItem from './basket-item';
import Button from '../button';
import Price from '../price';
import { orderProductsSelector, totalSelector } from '../../redux/selectors';
import { UserConsumer } from '../../contexts/user';

function Basket({ title = 'Basket', total, orderProducts }) {
  console.log('render Basket');
  // const { name } = useContext(userContext);

  if (!total) {
    return (
      <div className={styles.basket}>
        <h4 className={styles.title}>Select a meal from the list</h4>
      </div>
    );
  }

  return (
    <div className={styles.basket}>
      {/* <h4 className={styles.title}>{`${name}'n ${title}`}</h4> */}
      <h4 className={styles.title}>
        <UserConsumer>{({ name }) => `${name}'n ${title}`}</UserConsumer>
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
            <Price>{total}</Price>
        </div>
      </div>
      <Button primary block>
        checkout
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    total: totalSelector(state),
    orderProducts: orderProductsSelector(state),
  };
};

export default connect(mapStateToProps)(Basket);
