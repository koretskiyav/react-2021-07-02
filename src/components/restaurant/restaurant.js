import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { reviewPropTypes } from '../reviews/review';

import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import styles from './restaurant.module.css';


const Restaurant = ({ restaurant }) => {
  const { id, name, menu, reviews } = restaurant;

  const averageRating = useMemo(() => {
    const total = reviews.reduce((acc, { rating }) => acc + rating, 0);
    return Math.round(total / reviews.length);
  }, [reviews]);

  return (
    <div>
      <Banner heading={name}>
        <Rate value={averageRating} />
      </Banner>
      <div className={styles.restaurant}>
        <Menu key={id} menu={menu} />
        <Reviews reviews={reviews} />
      </div>
    </div>
  );
};

export const restaurantPropTypes = PropTypes.shape({
  restaurant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    menu: PropTypes.string.isRequired,
    reviews: PropTypes.arrayOf(reviewPropTypes).isRequired
  }).isRequired,
});

Restaurant.propTypes = restaurantPropTypes;

export default Restaurant;
