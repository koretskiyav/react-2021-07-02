import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';

import {
  loadReviews,
  reviewsLoadingSelector,
  reviewsNeedsLoadingSelector,
} from '../../redux/features/reviews';
import { loadUsers } from '../../redux/features/users';
import { useEffect } from 'react';
import {
  usersLoadingSelector,
  usersNeedsLoadingSelector,
} from '../../redux/features/users';
import Loader from '../loader';

const Reviews = ({
  reviews,
  resId,
  loadingReviews,
  loadReviews,
  reviewsNeedLoading,
  loadingUsers,
  loadUsers,
  usersNeedLoading,
}) => {
  useEffect(() => {
    if (reviewsNeedLoading) loadReviews(resId);
  }, [resId, loadReviews, reviewsNeedLoading]);

  useEffect(() => {
    if (usersNeedLoading) loadUsers();
  }, [loadUsers, usersNeedLoading]);

  return (
    <div className={styles.reviews}>
      {(loadingUsers && usersNeedLoading) ||
      (loadingReviews && reviewsNeedLoading) ? (
        <Loader />
      ) : (
        reviews.map((id) => <Review key={id} id={id} />)
      )}
      <ReviewForm resId={resId} />
    </div>
  );
};

Reviews.propTypes = {
  resId: PropTypes.string,
  reviews: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = (state, props) => ({
  loadingUsers: usersLoadingSelector(state, props),
  loadingReviews: reviewsLoadingSelector(state, props),
  reviewsNeedLoading: reviewsNeedsLoadingSelector(state, props),
  usersNeedLoading: usersNeedsLoadingSelector(state),
});

const mapDispatchToProps = {
  loadReviews,
  loadUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
