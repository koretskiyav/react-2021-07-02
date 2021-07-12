import Rate from '../../rate';
import styles from './review.module.css';
import { ReviewType } from './types';

const Review = ({ user, text, rating }) => (
  <div className={styles.review} data-id="review-root">
    <div className={styles.content}>
      <div>
        <h4 className={styles.name} data-id="review-name">
          {user}
        </h4>
        <p className={styles.comment} data-id="review-comment">
          {text}
        </p>
      </div>
      <div className={styles.rate} data-id="review-rate">
        <Rate value={rating} />
      </div>
    </div>
  </div>
);

Review.defaultProps = {
  user: 'Anonymous',
};

Review.propTypes = ReviewType.isRequired;

export default Review;
