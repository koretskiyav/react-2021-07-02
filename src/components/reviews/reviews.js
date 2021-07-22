import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';

import { loadReviews } from '../../redux/features/reviews';
import { useEffect } from 'react';
import { reviewsLoadingSelector } from '../../redux/features/reviews';
import Loader from '../loader';

const Reviews = ({ reviews, resId, loadReviews, loading }) => {
  useEffect(() => {
    loadReviews(resId);
  }, [resId, loadReviews]);

  if (loading) return <Loader />

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
};

const mapStateToProps = (state) => ({
  loading: reviewsLoadingSelector(state)
});

const mapDispatchToProps = {
  loadReviews,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
