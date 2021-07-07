import Review from './review';
import style from './reviews.module.css';

export default function Reviews({reviews}) {

  return (
    <div>
      <p className={style.text}>Reviews</p>
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  )
}
