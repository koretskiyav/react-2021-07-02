import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { decrement, increment, remove } from '../../../redux/actions';

import styles from './basketItem.module.css';
import { ReactComponent as Remove } from '../../../icons/remove.svg';

const BasketItem = ({ product, increment, decrement, remove }) => {
  const { name, amount, subTotal } = product;

  return (
    <li className={styles.item}>
      <h4 className={styles.name}>{name}</h4>
      <p className={styles.amount}>
        <button onClick={decrement}>-</button>
        <span>{amount}</span>
        <button onClick={increment}>+</button>
      </p>
      <p className={styles.price}>{subTotal} $</p>
      <button className={styles.remove} onClick={remove}>
        <Remove />
      </button>
    </li>
  );
};

BasketItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    subTotal: PropTypes.number.isRequired,
  }).isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, props) => ({
  increment: () => dispatch(increment(props.product.id)),
  decrement: () => dispatch(decrement(props.product.id)),
  remove: () => dispatch(remove(props.product.id)),
});

export default connect(null, mapDispatchToProps)(BasketItem);
