import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';

import { loadReviews } from '../../redux/features/reviews';
import { loadUsers } from '../../redux/features/users';


const Reviews = ({ reviews, resId, loadReviews, loadUsers }) => {
  useEffect(() => {
    loadUsers();
  }, []); //eslint-disable-line

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
  loadUsers: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  loadReviews,
  loadUsers
};

export default connect(null, mapDispatchToProps)(Reviews);
