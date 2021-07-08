import Rate from './rate';

import style from './review.module.css';

export default function Review({ review }) {
  return (
    <div className={style.card}>
      <h4>{review.user}</h4>
      <p>{review.text}</p>
      <Rate rate={review.rating}></Rate>
    </div>
  );
}
