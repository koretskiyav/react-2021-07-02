import PropTypes from 'prop-types';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';
import { connect } from 'react-redux';
import { activeRestaurantReviewsSelector } from '../../redux/selectors';

const Reviews = ({ reviews, restaurantId }) => {
  return (
    <div className={styles.reviews}>
      {reviews.map((review) => (
        <Review key={review.id} {...review} />
      ))}
      <ReviewForm restaurantId={restaurantId} />
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  restaurantId: PropTypes.string.isRequired,
};

export default connect((state, props) => {
  return {
    reviews: activeRestaurantReviewsSelector(state, props),
  };
})(Reviews);
