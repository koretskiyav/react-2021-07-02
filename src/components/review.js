import styles from './review.module.css';

export default function Review({ review }) {
  return (
    <div className={styles.reviewCard} key={review.id}>
      <p className={styles.name}>{review.user}</p>
      <p>{review.text}</p>
      <p>{review.rating}</p>
    </div>
  );
}
