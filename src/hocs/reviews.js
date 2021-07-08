import Review from '../components/review';
import style from './reviews.module.css';

export default function Reviews({reviews}) {
  return (
    <div className={'reviews'}>
      <h2>
        Отзывы:
      </h2>

      <div className={style.reviewsList}>
        {reviews.map((reviewCur) => {
          return <Review key={reviewCur.id} {...reviewCur} />
        })}
      </div>
    </div>
  );
}
