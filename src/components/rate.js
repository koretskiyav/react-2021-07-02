import { ReactComponent as StarActive } from '../icons/star_active.svg';
import { ReactComponent as StarDefault } from '../icons/star_default.svg';

import styles from './rate.module.css';

export default function Rate({ rating = 3 }) {
  const stars = Array(5)
    .fill(1)
    .map((item, i) => {
      return (
        <li key={'star' + i} className={styles.item}>
          {i + 1 <= rating ? <StarActive /> : <StarDefault />}
        </li>
      );
    });

  return (
    <div>
      <ul className={styles.list}>{stars}</ul>
    </div>
  );
}
