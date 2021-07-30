import { useEffect } from 'react';
import styles from './successPage.module.css';
import { connect } from 'react-redux';
import { clearOrder } from '../../redux/features/order';

const SuccessPage = ({ clearBasket }) => {
  useEffect(() => {
    clearBasket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.banner}>
      <p>Ваш заказ оформлен!</p>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearBasket: () => dispatch(clearOrder()),
});
export default connect(null, mapDispatchToProps)(SuccessPage);
