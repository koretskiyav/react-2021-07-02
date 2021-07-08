import { ReactComponent as YellowStar } from '../icons/yellow-star.svg';
import { ReactComponent as BlackStar } from '../icons/black-star.svg';
import style from './rate.module.css';

export default function Rate({ rating }) {
  const starsArray =  [1, 2, 3, 4, 5];

  return (
    starsArray.map((starPosition) =>
      starPosition <= rating
        ? <YellowStar className={style.star} />
        : <BlackStar className={style.star} />
    )
  );
}
