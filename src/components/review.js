import styles from './review.module.css';
import Rate from './rate';

export default function Review({ review }) {
  return (
    <div className={styles.reviewCard} key={review.id}>
      <p className={styles.name}>{review.user}</p>
      <p>{review.text}</p>
      <Rate rating={review.rating} />
    </div>
  );
}
