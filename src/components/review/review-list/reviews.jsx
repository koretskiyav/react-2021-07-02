import Review from '../review-item/review-item'
import styles from './reviews.module.css'

const Reviews = ({ reviews }) => {
  return (
    <div className={styles['container']}>
      <p className={styles['title']}>
        {`Reviews (${reviews.length})`}
      </p>
      <div className={styles['list']}>
        {
          reviews.length > 0
          ? reviews.map(r => <Review review={r} key={r.id} />)
          : <p className={styles['banner']}>No reviews yet</p>
        }
      </div>
    </div>
  )
}

export default Reviews
