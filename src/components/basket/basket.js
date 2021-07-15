import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { restaurants } from '../../fixtures';
import Button from '../button';
import { decrement, increment, remove } from '../../redux/actions';
import styles from './basket.module.css';

const mergedMenu = restaurants.reduce((acc, restaurant) => {
  return acc.concat(restaurant.menu);
}, []);

function Basket({ order, decrement, increment, remove }) {
  let total = 0;
  return (
    <div className={styles.basket} data-id="basket">
        {
          Object.keys(order).map((productId, index) => {
            const product = mergedMenu.find((p) => p.id === productId);
            if (!product) {
              return null;
            }
            const amount = order[productId];
            const sum = product.price * amount;
            total += sum;
            
            return (<div className={styles.content} key={index}>
              <div>
                <h4 className={styles.title}>{product.name}</h4>
                <div className={styles.price}>{product.price} $</div>
              </div>
              <div className={styles.counter}>
                <div className={styles.count} data-id="product-amount">
                  {amount}
                 </div>
                 <div className={styles.buttons}>
                  <Button
                    onClick={() => decrement(productId)}
                    icon="minus"
                    data-id="product-decrement"
                  />
                  <Button
                    onClick={() => increment(productId)}
                    icon="plus"
                    data-id="product-increment"
                  />
                  <Button
                    onClick={() => remove(productId)}
                    icon="cross"
                  />
                 </div>
                 <div className={styles.sum}>Sum: {sum} $</div>
              </div>
              
              </div>);
          })
    
        }
        <div className={styles.total}>Total sum: {total} $ </div>
    </div>
  );
}

Basket.propTypes = {
  increment: PropTypes.func,
  decrement: PropTypes.func,
  remove: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  order: state.order,
});

const mapDispatchToProps = (dispatch, props) => ({
  increment: (productId) => dispatch(increment(productId)),
  decrement: (productId) => dispatch(decrement(productId)),
  remove:  (productId) => dispatch(remove(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
