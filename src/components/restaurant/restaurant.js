import { useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import Tabs from '../tabs';
import { connect } from 'react-redux';
import { getAverageRating, getRestaurant, getReviewsList } from '../../redux/selectors';

const Restaurant = ({ restaurant, reviews, averageRating }) => {

  const [activeTab, setActiveTab] = useState('menu');

  const tabs = [
    { id: 'menu', label: 'Menu' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div>
      <Banner heading={restaurant.name}>
        <Rate value={averageRating} />
      </Banner>
      <Tabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} />
      {activeTab === 'menu' && <Menu menu={restaurant['menu']} key={restaurant.id} />}
      {activeTab === 'reviews' && <Reviews restaurantId={restaurant.id} reviews={reviews} />}
    </div>
  );
};

Restaurant.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    menu: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired
  }).isRequired
};

const mapStateToProps = (state, props) => ({
  restaurant: getRestaurant(state, props),
  reviews: getReviewsList(state, props),
  averageRating: getAverageRating(state, props)
});


export default connect(mapStateToProps)(Restaurant);

