import Rate from '../../rate';
import styles from './review.module.css';
import PropTypes from 'prop-types';

const Review = ({ user, text, rating }) => (
  <div className={styles.review}>
    <div className={styles.content}>
      <div>
        <h4 className={styles.name}  data-id="reviews-user">{user}</h4>
        <p className={styles.comment}  data-id="reviews-text">{text}</p>
      </div>
      <div className={styles.rate} data-id="reviews-rating">
        <Rate value={rating} />
      </div>
    </div>
  </div>
);

Review.defaultProps = {
  user: 'Anonymous',
};

Rate.propTypes = {
  user: PropTypes.string,
  text: PropTypes.string,
};

export default Review;
