import { useMemo } from 'react';
import { ReactComponent as Star } from '../icons/star.svg';
import { ReactComponent as StarActive } from '../icons/starActive.svg';
import style from './rate.module.css';

export default function Rate({ middleRate, value }) {
  const rate = useMemo(() => {
    const stars = [];
    for (let i = 0; i <= 4; i++) {
      stars.push(
        <li key={i} className={style.star}>
          {value > i ? <StarActive /> : <Star />}
        </li>
      );
    }
    return stars;
  }, [value]);
  return (
    <div>
      <ul className={style.stars}>{rate}</ul>
      <div className={style.rate}>
        <p className={style.rateText}>{'Средний рейтинг: '}</p>
        <span className={style.rateNumber}>{middleRate}</span>
      </div>
    </div>
  );
}
