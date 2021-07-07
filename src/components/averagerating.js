import Rate from './rate';
import style from './averagerating.module.css';

export default function Averagerating({reviews}) {

  function averageRating(){
    let averageRating = 0
    for (let index = 0; index < reviews.length; index++) {
      averageRating+= reviews[index].rating
    }
    return averageRating/reviews.length
  } 

  return (
    <div className={style.container}>
      <p className={style.text}>Average Rating</p>
      <Rate rate = {averageRating()} />
    </div>
  )
}
