import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as Star } from '../../icons/star.svg';

import styles from './rate.module.css';

const Rate = ({ value, onChange }) => (
  <div>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        data-id={i <= value - 1 ? 'full-star' : 'empty-star'}
        className={cn(styles.star, {
          [styles.checked]: i <= value - 1,
          [styles.clickable]: !!onChange,
        })}
        onClick={onChange ? () => onChange(i + 1) : undefined}
      />
    ))}
  </div>
);

Rate.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

export default Rate;
