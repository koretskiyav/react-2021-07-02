import { useMemo } from 'react';
import style from './reviews.module.css';
import Rate from './rate';

function Review({ user, text, rating }) {
  return (
    <div className={style.review}>
      <div className={style.container}>
        <h4>{user}</h4>
        <p>{text}</p>
      </div>
      <div className={style.container}>
        <Rate value={rating} />
      </div>
    </div>
  );
}

function Reviews({ reviews }) {
  const renderedReviews = useMemo(
    () => reviews.map((review, key) => <Review key={key} {...review} />),
    [reviews]
  );

  return <div className={style.reviews}>{renderedReviews}</div>;
}

export default Reviews;
