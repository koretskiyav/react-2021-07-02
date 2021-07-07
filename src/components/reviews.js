import style from './reviews.module.css';

import Review from './review';

export default function Reviews({ reviews }) {
  return (
    <div className={style.block}>
      Reviews:
      {reviews.map((review) => (
        <Review
          key={review.id}
          user={review.user}
          text={review.text}
          rating={review.rating}
        />
      ))}
    </div>
  );
}
