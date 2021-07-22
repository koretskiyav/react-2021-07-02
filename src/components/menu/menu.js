import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Product from '../product';
import Basket from '../basket';

import {
  loadProducts,
  productsLoadingSelector,
  productsNeedsLoadingSelector,
} from '../../redux/features/products';

import styles from './menu.module.css';
import Loader from '../loader';

class Menu extends Component {
  static propTypes = {
    menu: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };

  state = { error: null };

  componentDidCatch(error) {
    this.setState({ error });
  }

  componentDidMount() {
    if (this.props.needsLoading) this.props.loadProducts(this.props.resId);
  }

  render() {
    const { menu, loading, needsLoading } = this.props;

    if (this.state.error) {
      return <p>Меню этого ресторана сейчас недоступно :(</p>;
    }

    return (
      <div className={styles.menu}>
        <div>
          {loading && needsLoading ? (
            <Loader />
          ) : (
            menu.map((id) => <Product key={id} id={id} />)
          )}
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
  needsLoading: productsNeedsLoadingSelector(state, props),
});

const mapDispatchToProps = (dispatch, props) => ({
  loadProducts: () => dispatch(loadProducts(props.resId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
