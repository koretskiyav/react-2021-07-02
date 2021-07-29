import { useContext } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { increment, decrement, remove } from '../../../redux/features/order';
import Button from '../../button';
import styles from './basket-item.module.css';
import { Link } from 'react-router-dom'
import { restaurantByProductSelector } from '../../../redux/selectors'

import moneyContext from '../../../contexts/money';

function BasketItem({
  product,
  amount,
  subtotal,
  increment,
  decrement,
  remove,
  restaurant
}) {
  const { m } = useContext(moneyContext);
  const link = restaurant?.id 
    ? `/restaurants/${restaurant.id}`
    : '/restaurants'
   
  return (
    <div className={styles.basketItem}>
      <div className={styles.name}>
        <Link to={link}>{product.name}</Link>
      </div>
      <div className={styles.info}>
        <div className={styles.counter}>
          <Button onClick={decrement} icon="minus" secondary small />
          <span className={styles.count}>{amount}</span>
          <Button onClick={increment} icon="plus" secondary small />
        </div>
        <p className={cn(styles.count, styles.price)}>{m(subtotal)}</p>
        <Button onClick={remove} icon="delete" secondary small />
      </div>
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  restaurant: restaurantByProductSelector(state, props.product)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  increment: () => dispatch(increment(ownProps.product.id)),
  decrement: () => dispatch(decrement(ownProps.product.id)),
  remove: () => dispatch(remove(ownProps.product.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketItem);
