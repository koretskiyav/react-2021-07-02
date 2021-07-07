
import Rate from './rate';
import style from './review.module.css';

export default function Review({review}) {
  return (
    <div className={style.container}>
      <ul className={style.ul}>
        <li className={style.user}>User: {review.user}</li>
        <li className={style.comment}>Comment</li>
        <li className={style.text}>{review.text}</li>
        <li className={style.rating}>Rating</li>
        <li ><Rate rate={review.rating}/></li>
      </ul>
    </div>
  )
}
