import Rate from '../../rate';
import styles from './review.module.css';
import PropTypes from 'prop-types';

const Review = ({ user, text, rating }) => (
  <div className={styles.review}>
    <div className={styles.content}>
      <div>
        <h4 className={styles.name}>{user}</h4>
        <p className={styles.comment}>{text}</p>
      </div>
      <div className={styles.rate}>
        <Rate value={rating} data-id="rate"/>
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
    rating: PropTypes.number.isRequired,  
};
export default Review;
