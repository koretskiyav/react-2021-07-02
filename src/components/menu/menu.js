import { connect } from 'react-redux';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Product from '../product';
import Basket from '../basket';
import Loader from '../loader';

import styles from './menu.module.css';
import { loadProducts, productsLoadingSelector } from '../../redux/features/products';

const Menu = ({ menu, loading, restaurantId, loadProducts }) => {
  useEffect(() => {
    loadProducts(restaurantId);
  }, [restaurantId, loadProducts]);

  if (loading) return <Loader />;

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

Menu.propTypes = {
  restaurantId: PropTypes.string,
  menu: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  loading: productsLoadingSelector(state),
});

const mapDispatchToProps = {
  loadProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
