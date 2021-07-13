import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './product.module.css';
import Button from '../button';
import { decrement, increment } from '../../redux/actions';

function Product({ product, amount, decrement, increment, fetchData }) {
  useEffect(() => {
    fetchData && fetchData(product.id);
  }, []); // eslint-disable-line

  return (
    <div className={styles.product} data-id="product">
      <div className={styles.content}>
        <div>
          <h4 className={styles.title}>{product.name}</h4>
          <p className={styles.description}>{product.ingredients.join(', ')}</p>
          <div className={styles.price}>{product.price} $</div>
        </div>
        <div>
          <div className={styles.counter}>
            <div className={styles.count} data-id="product-amount">
              {amount}
            </div>
            <div className={styles.buttons}>
              <Button
                onClick={decrement}
                icon="minus"
                data-id="product-decrement"
              />
              <Button
                onClick={increment}
                icon="plus"
                data-id="product-increment"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  fetchData: PropTypes.func,
  // from connect
  amount: PropTypes.number,
  increment: PropTypes.func,
  decrement: PropTypes.func,
};

const mapStateToProps = (state) => ({
  amount: state.order,
});

const mapDispatchToProps = {
  increment,
  decrement,
};

// const mapDispatchToProps = (dispatch) => ({
//   increment: (a, b, c) => dispatch(increment(a, b, c)),
//   decrement: () => dispatch(decrement()),
// });

export default connect(mapStateToProps, mapDispatchToProps)(Product);
