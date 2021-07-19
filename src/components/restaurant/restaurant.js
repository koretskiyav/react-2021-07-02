import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import Tabs from '../tabs';
import { connect } from 'react-redux';
import { reviewsSelector } from '../../redux/features/reviews';

const Restaurant = ({ restaurant, reviewsFull }) => {
  const { id, name, menu, reviews: reviewsId } = restaurant;

  const [activeTab, setActiveTab] = useState('menu');

  const sortReviews = useMemo(() => {
    return reviewsId.map((reviewId) => reviewsFull[reviewId]);
  }, [reviewsFull, reviewsId]);

  const averageRating = useMemo(() => {
    const total = sortReviews.reduce((acc, { rating }) => acc + rating, 0);
    return Math.round(total / sortReviews.length);
  }, [sortReviews]);

  const tabs = [
    { id: 'menu', label: 'Menu' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <div>
      <Banner heading={name}>
        <Rate value={averageRating} />
      </Banner>
      <Tabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} />
      {activeTab === 'menu' && <Menu menu={menu} key={id} />}
      {activeTab === 'reviews' && (
        <Reviews restaurantId={id} reviews={sortReviews} />
      )}
    </div>
  );
};

Restaurant.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    menu: PropTypes.array,
    reviews: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  return {
    reviewsFull: reviewsSelector(state),
  };
};

export default connect(mapStateToProps, null)(Restaurant);
