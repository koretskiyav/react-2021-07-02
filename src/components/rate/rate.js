import cn from 'classnames';

import { ReactComponent as Star } from '../../icons/star.svg';

import styles from './rate.module.css';
import PropTypes from 'prop-types';

const Rate = ({ value }) => (
  <div>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn(styles.star, { [styles.checked]: i <= value - 1 })}
        data-id="review-star"
      />
    ))}
  </div>
);

// Not required, because number < undefined - number is always false
Rate.propTypes = {
  value: PropTypes.number
}

export default Rate;
