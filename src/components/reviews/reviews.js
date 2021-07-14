import Review from './review';
import styles from './reviews.module.css';
import PropTypes from 'prop-types';

const Reviews = ({ reviews }) => {
  return (
    <div className={styles.reviews} data-id="reviews">
      {reviews.map((review) => (
        <Review key={review.id} {...review} data-id={review.id} />
      ))}
    </div>
  );
};

Review.propTypes = {
  reviews: PropTypes.array,
};

export default Reviews;
