import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import Review from './review';
import ReviewForm from './review-form';

import { loadUsers } from '../../redux/features/users';
import { fulfilled } from '../../redux/constants';

import styles from './reviews.module.css';

const Reviews = ({ reviewsIds, resId, users, loadUsers }) => {

  useEffect(() => {
    if(!users.status === fulfilled) loadUsers();
  }, []); //eslint-disable-line

  return (
    <div className={styles.reviews}>
      {reviewsIds.map((id) => (
        <Review key={id} id={id} />
      ))}
      <ReviewForm resId={resId} />
    </div>
  )
};

Reviews.propTypes = {
  resId: PropTypes.string,
  reviewsIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  loadUsers: PropTypes.func.isRequired,
  users: PropTypes.shape({
    error: PropTypes.bool,
    status: PropTypes.string
  }),
};

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = {
  loadUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
