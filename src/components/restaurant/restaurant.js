import { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import Tabs from '../tabs';
import { reviewByRestaurantSelector } from '../../redux/selectors';

const Restaurant = ({ restaurant, reviews }) => {
  const { id, name, menu } = restaurant;
  const [activeTab, setActiveTab] = useState('menu');

  const reviewList = Object.values(reviews);
  const averageRating = useMemo(() => {
    const total = reviewList.reduce((acc, { rating }) => acc + rating, 0);
    return Math.round(total / reviewList.length);
  }, [reviewList]);

  const tabs = [
    { id: 'menu', name: 'Menu' },
    { id: 'reviews', name: 'Reviews' },
  ];

  return (
    <div>
      <Banner heading={name}>
        <Rate value={averageRating} />
      </Banner>
      <Tabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} />
      {activeTab === 'menu' && <Menu menu={menu} key={id} />}
      {activeTab === 'reviews' && (
        <Reviews reviews={reviewList} restaurantId={id} />
      )}
    </div>
  );
};

Restaurant.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    menu: PropTypes.object,
    reviews: PropTypes.objectOf(
      PropTypes.shape({
        rating: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};

export default connect((state, ownProps) => ({
  ...ownProps,
  reviews: reviewByRestaurantSelector(state)([ownProps.restaurant.id]),
}))(Restaurant);
