import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  loadProducts,
  productsLoadedSelector,
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

  componentDidMount() {
    this.props.loadProducts(this.props.restId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.restId !== this.props.restId) {
      this.props.loadProducts(this.props.restId);
    }
  }

  componentDidCatch(error) {
    this.setState({ error });
  }
  z

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
});

const mapDispatchToProps = { loadProducts };

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
