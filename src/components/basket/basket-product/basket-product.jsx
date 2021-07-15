import { connect } from 'react-redux'
import BasketButton from '../basket-button/basket-button'
import styles from './basket-product.module.css'
import { decrement, increment, reset } from '../../../redux/actions';

const BasketProduct = ({
  product,
  increment,
  decrement,
  reset
}) => {
  return (
    <div className={styles['product']}>
      <div className={styles['name']}>{product.name}</div>
      <div className={styles['price']}>{product.sum}$</div>
      <div className={styles['amount']}>{product.amount}x</div>
      <div className={styles['buttons']}>
        <BasketButton text="+" onClick={increment} />
        <BasketButton text="-" onClick={decrement} />
        <BasketButton text="х" onClick={reset} />
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    increment: () => dispatch(increment(props.product.id)),
    decrement: () => dispatch(decrement(props.product.id)),
    reset: () => dispatch(reset(props.product.id))
  }
}

export default connect(null, mapDispatchToProps)(BasketProduct)
