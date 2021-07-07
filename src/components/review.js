import style from './product.module.css';

function Review({ review }) {
  return (
    <div className={style.card}>
      <p>{review.user}</p>
      <p>{review.text}</p>
    </div>
  );
}

export default Review;
