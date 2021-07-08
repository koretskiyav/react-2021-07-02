import cn from 'classnames';

import { ReactComponent as Star } from '../../icons/star.svg';

import styles from './rate.module.css';

const Rate = ({ value }) => (
  <div>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn(styles.star, { [styles.checked]: i <= value - 1 })}
      />
    ))}
  </div>
);

export default Rate;
