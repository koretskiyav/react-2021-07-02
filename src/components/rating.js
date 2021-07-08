import style from './rating.module.css';
import { ReactComponent as StarIcon} from '../icons/star.svg';
import { useMemo } from 'react';

function getStart(rating) {
  const stars = [];

  for (let i = 0; i < rating; i++) {
    stars.push(
      <div className={style.star} key={i}>
        <StarIcon />
      </div>
    );
  }

  return stars;
}

export default function Rating({rating}) {
  const stars = useMemo(() => getStart(rating), [rating]);

  return (
    <div className={style.rating}>
      <div className={style.stars}>
        { stars }
      </div>
    </div>
  );
}
