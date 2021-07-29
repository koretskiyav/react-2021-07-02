import styles from './order-failure.module.css'
import { Link } from 'react-router-dom'

const OrderFailure = () => (
  <div className={styles['container']}>
    <p className={styles['title']}>Something went wrong :(</p>  
    <Link to="/checkout">to checkout</Link>
  </div>
)

export default OrderFailure