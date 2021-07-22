import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import Tabs from '../tabs';

import { restaurantSelector } from '../../redux/features/restaurants';
import { loadProducts } from '../../redux/features/products'
import { averageRatingSelector } from '../../redux/selectors';

const Restaurant = ({ restaurant, averageRating, loadProducts, products }) => {
  const { id, name, menu,  reviews } = restaurant;

  const [activeTab, setActiveTab] = useState('menu');

  const tabs = [
    { id: 'menu', label: 'Menu' },
    { id: 'reviews', label: 'Reviews' },
  ];

  useEffect(() => {
    products[menu[0]] || loadProducts();
  }, [restaurant]);

  return (
    <div>
      <Banner heading={name}>
        <Rate value={averageRating} />
      </Banner>
      <Tabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} />
      {activeTab === 'menu' && <Menu menu={menu} key={id} />}
      {activeTab === 'reviews' && <Reviews reviews={reviews} resId={id} />}
    </div>
  );
};

Restaurant.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    menu: PropTypes.array,
    reviews: PropTypes.array,
  }).isRequired,
  averageRating: PropTypes.number,
};

const mapStateToProps = (state, props) => ({
  restaurant: restaurantSelector(state, props),
  averageRating: averageRatingSelector(state, props),
  products: state.products
});

const mapDispatchToProps = (dispatch, props) => ({
  loadProducts: () => dispatch(loadProducts(props.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
