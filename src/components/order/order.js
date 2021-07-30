import { connect } from 'react-redux';

import { Redirect, Link } from 'react-router-dom';

import Loader from '../loader';
import styles from './order.module.css';

import {
  orderStatusSelector,
  orderErrorSelector,
  resetOrderStatus,
} from '../../redux/features/order';
import { fulfilled, idle, pending, rejected } from '../../redux/constants';
import Button from '../button';

const OrderPage = ({ orderStatus, resetOrderStatus, orderError }) => {
  if (orderStatus === idle) {
    return <Redirect to="/restaurants" />;
  }

  if (orderStatus === pending) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <p className={styles.message}>We are sending your order...</p>
          <Loader />
        </div>
      </div>
    );
  }

  if (orderStatus === fulfilled) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <p className={styles.message}>
            Congratulations! Your order has been successfully sent!.
          </p>
          <Link to="/restaurants">
            <Button primary block onClick={resetOrderStatus}>
              Back to restaurants
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (orderStatus === rejected) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <p
            className={styles.message}
          >{`Unfortunately ${orderError.message}`}</p>
          <div className={styles.row}>
            <Link to="/checkout">
              <Button primary block>
                Back to basket
              </Button>
            </Link>
            <p className={styles.separator}>or</p>
            <Link to="/restaurants">
              <Button primary block>
                Back to restaurants
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  orderStatus: orderStatusSelector(state),
  orderError: orderErrorSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  resetOrderStatus: () => dispatch(resetOrderStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
