import PropTypes from 'prop-types';

import Rate from '../../rate';
import styles from './review.module.css';
import { connect } from 'react-redux';
import { usersSelector } from '../../../redux/features/users';

const Review = ({ userId, text, rating, users }) => (
  <div className={styles.review} data-id="review">
    <div className={styles.content}>
      <div>
        <h4 className={styles.name} data-id="review-user">
          {users[userId]?.name}
        </h4>
        <p className={styles.comment} data-id="review-text">
          {text}
        </p>
      </div>
      <div className={styles.rate}>
        <Rate value={rating} />
      </div>
    </div>
  </div>
);

Review.propTypes = {
  userId: PropTypes.string,
  text: PropTypes.string,
  rating: PropTypes.number.isRequired,
  users: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

Review.defaultProps = {
  users: 'Anonymous',
};

const mapStateToProps = (state) => {
  return {
    users: usersSelector(state),
  };
};

export default connect(mapStateToProps, null)(Review);
