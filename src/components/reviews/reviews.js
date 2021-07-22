import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';

import {
  loadingReviewsSelector,
  loadReviews,
} from '../../redux/features/reviews';
import { useEffect } from 'react';
import Loader from '../loader';

const Reviews = ({ reviews, restId, loading, loadReviews }) => {
  useEffect(() => {
    loading && loadReviews(restId);
  }, [restId, loading, loadReviews]);

  if (loading) return <Loader />;

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
  loading: PropTypes.bool.isRequired,
  loadReviews: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  loading: loadingReviewsSelector(state, props),
});

const mapDispatchToProps = {
  loadReviews,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
