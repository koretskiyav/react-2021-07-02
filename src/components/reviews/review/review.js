import Rate from '../../rate';
import styles from './review.module.css';
import PropTypes from 'prop-types';

const Review = ({ user, text, rating }) => (
  <div className={styles.review} data-id="review-data">
    <div className={styles.content}>
      <div>
        <h4 className={styles.name} data-id="review-user">{user}</h4>
        <p className={styles.comment} data-id="review-text">{text}</p>
      </div>
      <div className={styles.rate}>
        <Rate value={rating} data-id="review-rating" />
      </div>
    </div>
  </div>
);

Review.defaultProps = {
  user: 'Anonymous',
};

Review.propTypes = {
  user: PropTypes.string,
  text: PropTypes.string,
  rating: PropTypes.number,
}

export default Review;
