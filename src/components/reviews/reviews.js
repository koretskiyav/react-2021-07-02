import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Review from './review';
import ReviewForm from './review-form';
import Loader from '../loader';

import { loadingUsersSelector, loadUsers } from '../../redux/features/users';
import {
  loadingReviewsSelector,
  loadReviews,
} from '../../redux/features/reviews';

import styles from './reviews.module.css';

const Reviews = ({
  reviews,
  restId,
  reviewsLoading,
  loadReviews,
  usersLoading,
  loadUsers,
}) => {
  useEffect(() => {
    usersLoading && loadUsers();
  }, [usersLoading, loadUsers]);

  useEffect(() => {
    reviewsLoading && loadReviews(restId);
  }, [restId, reviewsLoading, loadReviews, loadUsers]);

  if (reviewsLoading) return <Loader />;

  return (
    <div className={styles.reviews}>
      {reviews.map((id) => (
        <Review key={id} id={id} />
      ))}
      <ReviewForm restId={restId} />
    </div>
  );
};

Reviews.propTypes = {
  restId: PropTypes.string,
  reviews: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  reviewsLoading: PropTypes.bool.isRequired,
  usersLoading: PropTypes.bool.isRequired,
  loadReviews: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  reviewsLoading: loadingReviewsSelector(state, props),
  usersLoading: loadingUsersSelector(state, props),
});

const mapDispatchToProps = {
  loadUsers,
  loadReviews,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
