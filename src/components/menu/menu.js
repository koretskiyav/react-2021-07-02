import { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { loadProducts } from '../../redux/features/products';
import { loadingProductsSelector } from '../../redux/features/products';

import Product from '../product';
import Basket from '../basket';
import Loader from '../loader';

import styles from './menu.module.css';

class Menu extends Component {
  static propTypes = {
    menu: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    loading: PropTypes.bool.isRequired,
    loadProducts: PropTypes.func.isRequired,
  };

  state = { error: null, loading: this.props.loading };

  componentDidCatch(error) {
    this.setState({ error });
  }

  componentDidMount() {
    if (this.state.loading) {
      this.props.loadProducts(this.props.restId);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.loading !== this.props.loading) {
      this.setState({
        loading: this.props.loading,
      });
    }
  }

  render() {
    const { menu } = this.props;

    if (this.state.error) {
      return <p>Меню этого ресторана сейчас недоступно :(</p>;
    }

    if (this.state.loading) {
      return <Loader />;
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
  loading: loadingProductsSelector(state, props),
});

const mapDispatchToProps = (dispatch, props) => ({
  loadProducts: () => dispatch(loadProducts(props.restId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
