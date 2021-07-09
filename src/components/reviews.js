import Review from './review';
import Rate from './rate';

import style from './reviews.module.css';

export default function Reviews({ reviews, middleRate }) {
  return (
    <div>
      <h3 className={style.title}>{'Reviews'}</h3>
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
      <Rate middleRate={middleRate} />
    </div>
  );
}
