import Rate from './rate';
import style from './review.module.css';

export default function Review({ review }) {
  return (
    <div className={style.review}>
      <p className={style.text}>{review.text}</p>
      <div className={style.info}>
        <p className={style.user}>{review.user}</p>
        <Rate middleRate={review.rating} />
      </div>
    </div>
  );
}
