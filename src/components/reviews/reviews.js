import PropTypes from 'prop-types';
import Review from './review';
import styles from './reviews.module.css';
import { ReviewType } from './review';

const Reviews = ({ reviews }) => {
  return (
    <div className={styles.reviews}>
      {reviews.map((review) => (
        <Review key={review.id} {...review} />
      ))}
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(ReviewType.isRequired).isRequired,
};

export default Reviews;
