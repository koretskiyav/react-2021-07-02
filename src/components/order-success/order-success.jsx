import styles from './order-success.module.css'
import { Link } from 'react-router-dom'

const OrderSuccess = () => (
  <div className={styles['container']}>
    <p className={styles['title']}>Order successfully placed!</p>  
    <Link to="/">to main page</Link>
  </div>
)

export default OrderSuccess