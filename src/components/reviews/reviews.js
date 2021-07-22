import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';
import Loader from '../loader';
import {
  reviewsIsLoadingSelector,
  usersISLoadingSelector,
} from '../../redux/selectors';
import { loadUsers } from '../../redux/features/users';

import { loadReviews } from '../../redux/features/reviews';
import { useEffect } from 'react';

const Reviews = ({
  reviews,
  resId,
  loadReviews,
  loadUsers,
  isLoadingReviews,
  isLoadingUser,
}) => {
  useEffect(() => {
    !isLoadingUser && loadUsers();
    !isLoadingReviews && loadReviews(resId);
  }, [isLoadingReviews, isLoadingUser, loadReviews, loadUsers, resId]);

  if (!isLoadingReviews) return <Loader />;

  return (
    <div className={styles.reviews}>
      {reviews.map((id) => (
        <Review key={id} id={id} />
      ))}
      <ReviewForm resId={resId} />
    </div>
  );
};

Reviews.propTypes = {
  resId: PropTypes.string,
  reviews: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  isLoadingReviews: PropTypes.bool,
  isLoadingUsers: PropTypes.bool,
};

const mapStateToProps = (state, props) => ({
  isLoadingReviews: reviewsIsLoadingSelector(state, props),
  isLoadingUser: usersISLoadingSelector(state, props),
});

const mapDispatchToProps = {
  loadReviews,
  loadUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
