import ProtoTypes from 'prop-types';

import Rate from '../../rate';
import styles from './review.module.css';

const Review = ({ user, text, rating }) => (
  <div className={styles.review} data-id="review">
    <div className={styles.content} data-id="review-content">
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

Review.protoTypes = {
  user: ProtoTypes.string,
  text: ProtoTypes.string,
  rating: ProtoTypes.number,
};

Review.defaultProps = {
  user: 'Anonymous',
  text: '',
  rating: 0,
};

export default Review;
