import React from 'react';
import { ReactComponent as Star } from '../icons/star.svg';
import style from './star.module.css';

const Rate = (props) => {
  let stars = Array.from({ length: props.value }, (v, i) => i);
  return (
    <div className={style.starWrap}>
      {stars.map((star) => (
        <span key={star}>
          <Star className={style.star} />
        </span>
      ))}
    </div>
  );
};

export default Rate;
