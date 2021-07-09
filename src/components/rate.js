import { useMemo } from 'react';
import { ReactComponent as Star } from '../icons/star.svg';
import { ReactComponent as StarActive } from '../icons/starActive.svg';
import style from './rate.module.css';

export default function Rate({ middleRate }) {
  const rate = useMemo(() => {
    const stars = Array(5)
      .fill(0)
      .map((_, index) => (
        <li key={index} className={style.star}>
          {middleRate > index ? <StarActive /> : <Star />}
        </li>
      ));
    return stars;
  }, [middleRate]);
  return (
    <div>
      <ul className={style.stars}>{rate}</ul>
    </div>
  );
}
