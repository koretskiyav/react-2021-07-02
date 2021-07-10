import ProtoTypes from 'prop-types';

import Rate from '../../rate';
import styles from './review.module.css';

const Review = ({ user, text, rating }) => (
  <div className={styles.review}>
    <div className={styles.content}>
      <div>
        <h4 className={styles.name}>{user}</h4>
        <p className={styles.comment}>{text}</p>
      </div>
      <div className={styles.rate}>
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
