import Review from './review';

import styles from './reviews.module.css';

export default function Reviews({ reviews }) {
  return (
    <div className={styles.wrapper}>
      <h2>Reviews</h2>
      <ul className={styles.list}>
        {reviews.map((review) => {
          return (
            <li key={review.id} className={styles.item}>
              <Review review={review} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
