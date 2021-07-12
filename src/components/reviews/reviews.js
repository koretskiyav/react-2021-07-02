import Review from './review';
import styles from './reviews.module.css';
import PropTypes from 'prop-types';

const Reviews = ({ reviews }) => {
  return (
    <div className={styles.reviews} data-id="reviews">
      {reviews.map((review) => (
        <Review key={review.id} {...review} />
      ))}
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired
  })).isRequired
}

export default Reviews;
