import PropTypes from 'prop-types';
import { useEffect } from 'react';

import Product from '../product';
import Basket from '../basket';
import { connect } from 'react-redux';
import { loadProducts } from '../../redux/features/products';
import Loader from '../loader';
import { productsIsLoadingSelector } from '../../redux/selectors';

import styles from './menu.module.css';

const Menu = ({ menu, restId, loadProducts, isLoading }) => {
  useEffect(() => {
    !isLoading && loadProducts(restId);
  }, [isLoading, loadProducts, restId]);

  if (!isLoading) return <Loader />;

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
};

Menu.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state, props) => ({
  isLoading: productsIsLoadingSelector(state, props),
});

const mapDispatchToProps = {
  loadProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
