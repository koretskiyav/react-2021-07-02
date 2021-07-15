import { connect } from 'react-redux';
import PropTypes, { object } from 'prop-types';
import { remove, decrement, increment } from '../../redux/actions';
import Button from '../button';
import styles from '../product/product.module.css';

function Bucket({ allRestaurants, orders, increment, decrement, remove }) {
  console.log({ allRestaurants, orders, increment, decrement, remove });
  const menus = allRestaurants.map((restaurant) => restaurant.menu);
  const keys = Object.keys(orders);
  const resultingOrders = Array(0);
  let sum = 0;
  for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < menus.length; j++) {
      let product = menus[j].find((product) => product.id === keys[i]);
      if (product !== undefined) {
        resultingOrders.push({ ...product, amount: orders[product.id] });
        sum += orders[product.id] * product.price;
      }
    }
  }

  return (
    <div>
      {resultingOrders.map((dish) => {
        return (
          <div
            key={dish.id}
            style={{
              paddingLeft: '100px',
              height: '60px',
              lineHeight: '60px',
              position: 'relative',
            }}
          >
            <span>{dish.name}</span>&nbsp;/&nbsp;
            <span>{dish.amount}</span>&nbsp;/&nbsp;
            <span>
              <b>{dish.amount * parseFloat(dish.price)}</b>
            </span>
            <div
              className={styles.buttons}
              style={{ position: 'absolute', right: '100px', top: '10px' }}
            >
              <Button
                onClick={() => {
                  decrement(dish.id);
                }}
                icon="minus"
                data-id="product-decrement"
              />
              <Button
                onClick={() => {
                  increment(dish.id);
                }}
                icon="plus"
                data-id="product-increment"
              />
              <Button
                onClick={() => {
                  remove(dish.id);
                }}
              />
            </div>
          </div>
        );
      })}
      {sum ? (
        <h2 style={{ textAlign: 'center' }}>
          <hr />
          Total: {sum}
        </h2>
      ) : (
        ``
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  orders: state.order,
});

const mapDispatchToProps = (dispatch, props) => ({
  increment: (id) => dispatch(increment(id)),
  decrement: (id) => dispatch(decrement(id)),
  remove: (id) => dispatch(remove(id)),
});

Bucket.propTypes = {
  allRestaurants: PropTypes.array.isRequired,
  orders: PropTypes.object.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Bucket);
