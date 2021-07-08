import React from 'react'
import { Rate } from '../Rate/Rate'
export const Reviews = ({ reviews }) => {

  const countRatingMiddle = () => {
    let count = 0;
    for (let key in reviews) {
      count += reviews[key].rating
    }
    return ((count / reviews.length).toFixed(1))
  }

  return (
    <div>
      <div>Средний рейтинг<Rate stars={countRatingMiddle()} ></Rate></div>
      <div>
        {
          reviews.map(({ id, user, text, rating }) => {
            return (
              <div key={id}>
                <div>Рейтинг {rating}</div>
                <div><Rate stars={rating} /></div>
                <div>Имя: {user}</div>
                <div>Текст отзыва: {text}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
