import Review from '../review-item/review-item'
import styles from './reviews.module.css'

const Reviews = ({ reviews }) => {
  return (
    <div className={styles['container']}>
      <p className={styles['title']}>
        {`Отзывы (${reviews.length})`}
      </p>
      <div className={'list'}>
        {
          reviews.length > 0
          ? reviews.map(r => <Review review={r} key={r.id} />)
          : <p className={styles['banner']}>Пока нет отзывов</p>
        }
      </div>
    </div>
  )
}

export default Reviews
