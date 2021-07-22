import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';
import Loader from '../loader';
import {
  loadReviews,
  reviewsSelector,
  reviewLoadingSelector,
} from '../../redux/features/reviews';
import { useEffect } from 'react';
import { loadUsers } from '../../redux/features/users';

const Reviews = ({ reviews, resId, loading, loadReviews, loadUsers }) => {
  useEffect(() => {
    loadReviews(resId);
    loadUsers();
  }, [resId, loadReviews]);
  if (loading) return <Loader />;
  return (
    <div className={styles.reviews}>
      {reviews.map((review) => (
        <Review key={review.id} id={review.id} />
      ))}
      <ReviewForm resId={resId} />
    </div>
  );
};

Reviews.propTypes = {
  resId: PropTypes.string,
  reviews: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapDispatchToProps = {
  loadReviews,
  loadUsers,
};
const mapStateToProps = (state, props) => ({
  reviews: reviewsSelector(state),
  loading: reviewLoadingSelector(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
