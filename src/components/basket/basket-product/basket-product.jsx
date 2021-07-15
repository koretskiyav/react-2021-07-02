import BasketButton from '../basket-button/basket-button'
import styles from './basket-product.module.css'

const BasketProduct = ({ product }) => {
  return (
    <div className={styles['product']}>
      <div className={styles['name']}>{product.name}</div>
      <div className={styles['price']}>{product.sum}$</div>
      <div className={styles['amount']}>{product.amount}x</div>
      <div className={styles['buttons']}>
        <BasketButton text="+" onClick={() => undefined} />
        <BasketButton text="-" onClick={() => undefined} />
        <BasketButton text="х" onClick={() => undefined} />
      </div>
    </div>
  )
}

export default BasketProduct
