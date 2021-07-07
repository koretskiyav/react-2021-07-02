import style from './review.module.css';

export default function Review({ review }) {
  return (
    <div className={style.review}>
      <p className={style.text}>{review.text}</p>
      <div className={style.info}>
        <p className={style.rating}>{`Rating: ${review.rating}`}</p>
        <p className={style.user}>{review.user}</p>
      </div>
    </div>
  );
}
