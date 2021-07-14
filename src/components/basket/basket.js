import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useMemo} from 'react';
import OrderItem from './orderItem';

import styles from './basket.module.css';

const Basket = ({ order, dishes }) => {

    const summaryAmount = useMemo(() => {
            const amount = Object.keys(order).reduce((sum, id)=> {
                const delta = order[id] * dishes[id].price;
                return sum + delta;
            }, 0);
            return amount;
        }, [order]);

    return (
      <div className={styles.basket}>
          {
              Object.keys(order)
                .map(id => !!order[id] && <OrderItem id={id} quantity={order[id]} key={id}/>)
          }
          <br />
          <h3>Total amount: {summaryAmount}$</h3>
      </div>
    );
};

Basket.propTypes = {
    order: PropTypes.object.isRequired,
    dishes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    order: state.order,
    dishes: state.dishes
});

export default connect(mapStateToProps)(Basket);
