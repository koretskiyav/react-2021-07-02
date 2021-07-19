import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Rate from '../../rate';
import styles from './review.module.css';

const Review = ({ review }) => {
  // TODO user name

  const { name, text, rating } = review

  return (
    <div className={styles.review} data-id="review">
      <div className={styles.content}>
        <div>
          <h4 className={styles.name} data-id="review-user">
            {name ?? 'Anonymous'}
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
  )
}

Review.propTypes = {
  id: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    review: state.reviews[props.id]
  }
}

export default connect(mapStateToProps)(Review);
