import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '../../button';
import { decrement, increment, reset } from '../../../redux/actions';

import styles from './orderItem.module.css';

const OrderItem = ({ id, name, price, quantity, increment, decrement, reset }) => {
    return (
        <div className={styles.orderItem}>
            <div className={styles.label}>
                {name}
                <div className={styles.price}>
                    <div>{quantity}</div>
                    <div>{quantity * price}$</div>
                </div>
            </div>
            <div className={styles.buttons}>
              <Button onClick={increment} icon="plus" />
              <Button onClick={decrement} icon="minus" />
              <Button onClick={reset} icon="plus" />
            </div>
        </div>
    );
};

OrderItem.propTypes = {
    id: PropTypes.string.isRequired,
    quantity: PropTypes.number,
    // from connect
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    increment: PropTypes.func,
    decrement: PropTypes.func,
    reset: PropTypes.func,
};

const mapDispatchToProps = (dispatch, props) => ({
    increment: () => dispatch(increment(props.id)),
    decrement: () => dispatch(decrement(props.id)),
    reset: () => dispatch(reset(props.id))
});

const mapStateToProps = (state, props) => ({
  name: state.dishes[props.id].name,
  price: state.dishes[props.id].price
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);
