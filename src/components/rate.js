import { ReactComponent as StarActive } from '../icons/star_active.svg';
import { ReactComponent as StarDefault } from '../icons/star_default.svg';

import styles from './rate.module.css';

export default function Rate({ rating = 3 }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <li key={'star' + i} className={styles.item}>
        {i <= rating ? <StarActive /> : <StarDefault />}
      </li>
    );
  }

  return (
    <div>
      <ul className={styles.list}>{stars}</ul>
    </div>
  );
}
