import Review from "./review";
import styles from "./reviews.module.css";

const Reviews = ({ reviews }) => {
  return (
    <div className={styles.reviews}>
      {reviews.map((review) => (
        <Review key={review.id} {...review} data-id="review" />
      ))}
    </div>
  );
};

export default Reviews;
