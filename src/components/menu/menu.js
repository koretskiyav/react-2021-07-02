import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Product from '../product';
import Basket from '../basket';
import {
  loadProducts,
  productsSelector,
  productLoadingSelector,
} from '../../redux/features/products';
import Loader from '../loader';
import { useEffect } from 'react';
import styles from './menu.module.css';

class Menu extends Component {
  static propTypes = {
    menu: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };

  state = { error: null };
  componentDidMount() {
    this.props.loadProducts(this.props.id);
  }
  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    if (this.props.loading) return <Loader />;
    if (this.state.error) {
      return <p>Меню этого ресторана сейчас недоступно :(</p>;
    }
    const { id, products } = this.props;
    return (
      <div className={styles.menu}>
        <div>
          {products.map((prod) => (
            <Product key={id} product={prod} />
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
  loading: productLoadingSelector(state),
  products: productsSelector(state),
});
const mapDispatchToProps = {
  loadProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
