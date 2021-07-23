import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  loadProducts,
  productsLoadedSelector,
  shouldLoadProductsSelector,
} from '../../redux/features/products';

import Product from '../product';
import Basket from '../basket';
import Loader from '../loader';

import styles from './menu.module.css';

class Menu extends Component {
  static propTypes = {
    restId: PropTypes.string.isRequired,
    menu: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };

  state = { error: null };

  loadProductsIfNeeded = () => {
    const { restId, shouldLoad, loadProducts } = this.props;
    if (shouldLoad) loadProducts(restId);
  };

  componentDidMount() {
    this.loadProductsIfNeeded();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.restId !== this.props.restId) {
      this.loadProductsIfNeeded();
    }
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { menu, loaded } = this.props;

    if (!loaded) {
      return <Loader />;
    }

    if (this.state.error) {
      return <p>Меню этого ресторана сейчас недоступно :(</p>;
    }

    return (
      <div className={styles.menu}>
        <div>
          {menu.map((id) => (
            <Product key={id} id={id} />
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
  loaded: productsLoadedSelector(state, props),
  shouldLoad: shouldLoadProductsSelector(state, props),
});

const mapDispatchToProps = { loadProducts };

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
