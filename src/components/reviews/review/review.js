import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Rate from '../../rate';
import styles from './review.module.css';
import { reviewSelector } from './../../../redux/features/reviews';
import { reviewUserSelector } from './../../../redux/selectors';
const Review = ({ reviewId, review, user }) => (
  <div className={styles.review} data-id="review">
    <div className={styles.content}>
      <div>
        <h4 className={styles.name} data-id="review-user">
          {user.name}
        </h4>
        <p className={styles.comment} data-id="review-text">
          {review.text}
        </p>
      </div>
      <div className={styles.rate}>
        <Rate value={review.rating} />
      </div>
    </div>
  </div>
);

Review.propTypes = {
  user: PropTypes.string,
  text: PropTypes.string,
  rating: PropTypes.number.isRequired,
};

Review.defaultProps = {
  user: 'Anonymous',
};

const mapStateToProps = (state, props) => ({
  review: reviewSelector(state)[props.reviewId] || 0,
  user: reviewUserSelector(state, props.reviewId),
});

// const mapDispatchToProps = {
//   increment,
//   decrement,
// };

const mapDispatchToProps = (dispatch, props) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Review);
