import { Component } from 'react';
import PropTypes from 'prop-types';

import Product from '../product';
import Basket from '../basket';

import styles from './menu.module.css';
import { connect } from 'react-redux';
import Loader from '../loader';
import {
  loadProducts,
  productsLoadingSelector,
  productsListSelector
} from '../../redux/features/products'

class Menu extends Component {
  static propTypes = {
    restaurantId: PropTypes.string.isRequired
  };

  state = { error: null };

  componentDidMount() {
    this.props.loadProducts(this.props.restaurantId)
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { products } = this.props;

    if (this.state.error) {
      return <p>Меню этого ресторана сейчас недоступно :(</p>;
    }

    if (this.props.loading) return <Loader />;

    return (
      <div className={styles.menu}>
        <div>
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <div>
          <Basket />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  loading: productsLoadingSelector(state),
  products: productsListSelector(state)
})

const mapDispatchToProps = {
  loadProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
