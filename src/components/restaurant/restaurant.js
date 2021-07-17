import { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import Tabs from '../tabs';

const Restaurant = ({ restaurant, normalizedReviews }) => {
  const { id, name, menu, reviews } = restaurant;

  const [activeTab, setActiveTab] = useState('menu');

  const filtered = Object.keys(normalizedReviews)
    .filter((key) => reviews.includes(key))
    .reduce((obj, key) => {
      obj[key] = normalizedReviews[key];
      return obj;
    }, {});

  const reviewList = Object.values(filtered);
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
      {activeTab === 'reviews' && <Reviews reviews={reviewList} />}
    </div>
  );
};

Restaurant.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    menu: PropTypes.array,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        rating: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};

export default connect((state) => ({
  normalizedReviews: state.reviews,
}))(Restaurant);
