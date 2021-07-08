import Rating from './rating.js';
import style from './review.module.css';

export default function Review({ user, text, rating }) {
  return (
    <div className={style.review}>
      <div className={style.name}>
        { user }
      </div>

      <Rating rating={rating} />

      <div className={style.text}>
        { text }
      </div>
    </div>
  );
}
