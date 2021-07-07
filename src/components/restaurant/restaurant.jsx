import { useMemo } from 'react'
import Menu from '../menu'
import Rate from '../rate/rate'
import Reviews from '../review/review-list/reviews'
import styles from './restaurant.module.css'

const Restaurant = ({ restaurant }) => {
  const { name: title, reviews, menu } = restaurant

  const averageRating = useMemo(() => {
    const sum = reviews.reduce(
      (prev, review) => (prev + review.rating), 0
    )

    return sum / reviews.length
  }, [reviews])

  return (
    <div className={styles['container']}>
      <div className={styles['title-container']}>
        <span className={styles['title']}>{title}</span>
        <Rate value={averageRating} />
      </div>
      <Menu menu={menu} />
      <Reviews reviews={reviews} />
    </div>
  )
}

export default Restaurant
