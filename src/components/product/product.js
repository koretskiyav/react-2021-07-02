import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './product.module.css';
import Button from '../button';
import { decrement, increment, empty } from '../../redux/actions';

function Product({ product, amount, decrement, increment, empty, fetchData, hasTotal }) {
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
            {hasTotal ? 
              <div>
                <span className={styles.total}>
                  Сумма: {product.price * amount}
                </span>
                <Button
                  onClick={empty}
                  icon="delete"
                />
              </div> : 
              null 
            }
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
  empty: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  amount: state.order[props.product.id] || 0,
});

// const mapDispatchToProps = {
//   increment,
//   decrement,
// };

const mapDispatchToProps = (dispatch, props) => ({
  increment: () => dispatch(increment(props.product.id)),
  decrement: () => dispatch(decrement(props.product.id)),
  empty: () => dispatch(empty(props.product.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
