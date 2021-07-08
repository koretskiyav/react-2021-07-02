import { useMemo } from 'react';
import { ReactComponent as Star } from '../icons/star.svg';

import style from './rate.module.css';

export default function Rate({ rate }) {
  const stars = useMemo(
    () =>
      Array.apply(null, Array(5)).map((elem, index) => {
        return index < rate ? (
          <Star key={index} className={[style.star, style.fill].join(' ')} />
        ) : (
          <Star key={index} className={style.star} />
        );
      }),
    [rate]
  );

  return <div>{stars}</div>;
}
