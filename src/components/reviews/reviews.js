import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';

import { loadReviews } from '../../redux/features/reviews';
import { useEffect } from 'react';

const Reviews = ({ reviews, resId, loadReviews }) => {
  useEffect(() => {
    loadReviews(resId);
  }, [resId, loadReviews]);

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

const mapDispatchToProps = {
  loadReviews,
};

export default connect(null, mapDispatchToProps)(Reviews);
