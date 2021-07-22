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
import { loadReviews } from '../../redux/features/reviews';

const Restaurant = ({
  restaurant,
  averageRating,
  loadProducts,
  products,
  loadReviews,
  reviewsData,
}) => {
  const { id, name, menu,  reviews } = restaurant;

  const [activeTab, setActiveTab] = useState('menu');

  const tabs = [
    { id: 'menu', label: 'Menu' },
    { id: 'reviews', label: 'Reviews' },
  ];

  useEffect(() => {
    if (activeTab === 'menu' && !products[menu[0]]) loadProducts();
    if (activeTab === 'reviews' && !reviewsData[reviews[0]]) loadReviews();
  }, [restaurant, activeTab]);

  return (
    <div>
      <Banner heading={name}>
        <Rate value={averageRating} />
      </Banner>
      <Tabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} />
      {activeTab === 'menu' && <Menu menu={menu} key={id} />}
      {activeTab === 'reviews' && <Reviews reviewsIds={reviews} resId={id} />}
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
  reviews: PropTypes.shape({
    error: PropTypes.bool,
    status: PropTypes.string
  }),

};

const mapStateToProps = (state, props) => ({
  restaurant: restaurantSelector(state, props),
  averageRating: averageRatingSelector(state, props),
  products: state.products,
  reviewsData: state.reviews
});

const mapDispatchToProps = (dispatch, props) => ({
  loadProducts: () => dispatch(loadProducts(props.id)),
  loadReviews: () => dispatch(loadReviews(props.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
