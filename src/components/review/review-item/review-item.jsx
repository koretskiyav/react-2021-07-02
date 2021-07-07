import { ReactComponent as Avatar } from '../../../icons/avatar.svg'
import styles from './review-item.module.css'
import Rate from '../../rate/rate'

const Review = ({ review }) => {
  const { user, text, rating } = review

  return (
    <div className={styles['container']}>
      <div className={styles['avatar']}><Avatar /></div>
      <div className={styles['content']}>
        <p className={styles['user-name']}>{user ?? 'Anonymous'}</p>
        <Rate value={rating} />
        <p className={styles['user-comment']}>{text ?? '...'}</p>
      </div>
    </div>
  )
}

export default Review
