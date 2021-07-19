import Rate from '../../rate';
import styles from './review.module.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getReviewById, getUserFromReview } from '../../../redux/selectors';

const Review = ({ review, user }) => {

  return (
    <div className={styles.review} data-id='review'>
      <div className={styles.content}>
        <div>
          <h4 className={styles.name} data-id='review-user'>
            {user.name}
          </h4>
          <p className={styles.comment} data-id='review-text'>
            {review.text}
          </p>
        </div>
        <div className={styles.rate}>
          <Rate value={review.rating} />
        </div>
      </div>
    </div>
  );
};

Review.propTypes = {
  review: PropTypes.shape({
      id: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      text: PropTypes.string,
      userId: PropTypes.string.isRequired
    }
  ),
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })
};

Review.defaultProps = {
  user: 'Anonymous'
};

const mapStateToProps = (state, props) => ({
  review: getReviewById(state, props),
  user: getUserFromReview(state, props)
});


export default connect(mapStateToProps)(Review);
