import { useMemo } from 'react';
import { ReactComponent as Star } from '../icons/star.svg';
import style from './rate.module.css';

function Rate({ value }) {
  const renderedStars = useMemo(
    () =>
      Array(5)
        .fill(0)
        .map((i, key) =>
          key <= value - 1 ? (
            <Star key={key} className={style.active} />
          ) : (
            <Star key={key} className={style.inactive} />
          )
        ),
    [value]
  );

  return <div className={style.ratebar}>{renderedStars}</div>;
}

export default Rate;
