import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  decrement as decrementAction,
  increment as incrementAction,
  deleteItem as deleteItemAction
} from '../../redux/actions';
import styles from './basket.module.css';

class Basket extends PureComponent {
  static propTypes = {
    restaurants: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
      }).isRequired
    ).isRequired,
    order: PropTypes.object,
    decrement: PropTypes.func,
    increment: PropTypes.func,
    deleteItem: PropTypes.func
  };

  static defaultProps = {
    order: null,
    decrement: () => {},
    increment: () => {},
    deleteItem: () => {}
  };

  state = {
    showBasket: false
  };

  componentDidUpdate() {
    if (this.checkOrder()) {
      return this.setState({
        showBasket: true
      });
    }

    this.setState({
      showBasket: false
    });
  }

  get generalMenu() {
    return this.props.restaurants.reduce((acc, restaurant) => acc.concat(restaurant.menu), []);
  }

  getSelectedProducts = () => {
    return this.generalMenu.filter((menuItem) => this.props.order[menuItem.id]);
  };

  getSelectedProductsPrice = () => {
    return this.getSelectedProducts().reduce((acc, menuItem) => this.props.order[menuItem.id] * menuItem.price + acc, 0);
  };

  checkOrder = () => {
    return this.getSelectedProducts().length > 0;
  };

  render() {
    const { decrement, increment, deleteItem, order } = this.props;

    if (!this.state.showBasket) {
      return null;
    }

    return (
      <div className={styles.basket}>
        Basket:
        {
          this.getSelectedProducts().map((product) => (
            <div
              key={product.id}
              className={styles.row}
            >
              <div key={product.id}>
                {product.name} - {order[product.id]} (QTY)
                : {product.price * order[product.id]}$
              </div>
              <button onClick={() => decrement(product.id)}>
                -
              </button>
              <button onClick={() => increment(product.id)}>
                +
              </button>
              <button onClick={() => deleteItem(product.id)}>
                x
              </button>
            </div>
          ))
        }
        <div>Total: {this.getSelectedProductsPrice()}$</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order
  };
};

const mapDispatchToProps = (dispatch) => ({
  increment: (id) => dispatch(incrementAction(id)),
  decrement: (id) => dispatch(decrementAction(id)),
  deleteItem: (id) => dispatch(deleteItemAction(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
