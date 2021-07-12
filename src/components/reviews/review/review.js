import PropTypes from 'prop-types';

import Rate from '../../rate';
import styles from './review.module.css';

const Review = ({ user, text, rating }) => (
  <div className={styles.review} data-id="review">
    <div className={styles.content}>
      <div>
        <h4 className={styles.name} data-id="name">{user}</h4>
        <p className={styles.comment} data-id="comment">{text}</p>
      </div>
      <div className={styles.rate}>
        <Rate value={rating} />
      </div>
    </div>
  </div>
);

Review.defaultProps = {
  user: 'Anonymous',
};

export const reviewPropTypes = PropTypes.shape({
  user: PropTypes.string,
  text: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
});

Review.propTypes = reviewPropTypes;

export default Review;
