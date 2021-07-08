import Rate from './rate.js';
import classes from './reviews.module.css'

export default function Reviews({reviews}) {
  return (
    <div className={classes.reviews}>
      <h3>Отзывы</h3>
      {reviews.map(({id, user, text, rating} = reviews) => {
        return (
          <div key={id} className={classes.review}>
            <div className={classes.name}>{user}</div>
            <div className={classes.text}>"{text}"</div>
            <div className={classes.boxStars}><span className={classes.boxStarsTitle}>Оценка:</span> <Rate star={rating}/></div>
          </div>
        )
      })}
    </div>
  )
}