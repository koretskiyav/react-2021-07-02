import { useEffect, useCallback } from 'react';
import styles from './basket.module.css';
import {
  decrement,
  increment,
  deleteBasket,
  append,
} from '../../../redux/actions';
import { connect } from 'react-redux';
import Button from '../../button';
import { ReactComponent as Delete } from '../../../icons/delete.svg';
import PropTypes from 'prop-types';

const Basket = ({
  basket,
  amount,
  summBasket,
  setSummBasket,
  decrement,
  increment,
  deleteBasket,
  append,
  visibleShop,
}) => {
  useEffect(() => {
    const newSummBasket = [...summBasket];
    let active = true;
    newSummBasket.map((item) => {
      if (item.id === basket.id) {
        item.summ = basket.price * amount;
        active = false;
        setSummBasket(newSummBasket);
      }
    });
    active &&
      setSummBasket([
        ...summBasket,
        {
          id: basket.id,
          summ: basket.price * amount,
        },
      ]);
  }, [amount, basket.price, setSummBasket]); // eslint-disable-line

  const handleIncrement = useCallback(() => {
    increment();
    append();
  }, [append, increment]);

  return (
    amount > 0 &&
    visibleShop && (
      <div className={styles.basket}>
        <h4 className={styles.name}>{basket.name}</h4>
        <div className={styles.buttons}>
          <Button onClick={decrement} icon="minus" />
          <span className={styles.amout}> {amount}</span>
          <Button onClick={() => handleIncrement()} icon="plus" />
        </div>
        <p className={styles.price}>{`${basket.price}$ X ${amount} = ${
          basket.price * amount
        }$`}</p>
        <button onClick={deleteBasket} className={styles.delete}>
          <Delete />
        </button>
      </div>
    )
  );
};

Basket.propTypes = {
  basket: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  amount: PropTypes.number,
  increment: PropTypes.func,
  deleteBasket: PropTypes.func,
  decrement: PropTypes.func,
  append: PropTypes.func,
  visibleShop: PropTypes.bool,
  summBasket: PropTypes.array.isRequired,
  setSummBasket: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  amount: state.order[props.basket.id] || 0,
});

const mapDispatchToProps = (dispatch, props) => ({
  increment: () => dispatch(increment(props.basket.id)),
  decrement: () => dispatch(decrement(props.basket.id)),
  deleteBasket: () => dispatch(deleteBasket(props.basket.id)),
  append: () => dispatch(append(props.basket)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
