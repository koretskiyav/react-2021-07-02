import Rating from './rating.js';
import { useMemo } from 'react';

function getMean(reviews) {
  let total = 0;

  for(let i = 0; i < reviews.length; i++) {
    total += reviews[i].rating;
  }

  return total / reviews.length;
}

export default function RatingMean({reviews}) {
  const mean = useMemo(() => getMean(reviews), [reviews]);

  return (
    <div className={'ratingMean'}>
      <h1>
        Средний рейтинг:
      </h1>

      <Rating rating={mean} />
    </div>
  );
}
