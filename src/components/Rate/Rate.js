import React from 'react'
import { ReactComponent as Star } from '../../icons/star.svg';
import style from './rate.module.css';

const starsLabel = [
  { num: 1 },
  { num: 2 },
  { num: 3 },
  { num: 4 },
  { num: 5 }
]

export const Rate = ({ stars = 0 }) => {
  return (
    <div className={style.wrapper}>
      {
        starsLabel.map((el, inx) => {

          return <Star className={`${inx + 1 <= +stars ? style.yellow : style.black}`} key={inx} />
        })

      }

    </div>
  )
}
