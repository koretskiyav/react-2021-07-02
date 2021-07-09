import Rate from './rate';

import styles from './review.module.css';

export default function Review({ review }) {
  const { user, text, rating } = review;

  return (
    <div className={styles.card}>
      <p className={styles.name}>{user}</p>
      <p className={styles.text}>"{text}"</p>
      <div className={styles.rating}>
        <Rate rating={rating} />
      </div>
    </div>
  );
}
