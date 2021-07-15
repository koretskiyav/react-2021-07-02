import styles from './basket-button.module.css'

const BasketButton = ({
  text,
  onClick
}) => {
  return (
    <div className={styles['button']} onClick={onClick}>
      <span className={styles['text']}>{text}</span>
    </div>
  )
}

export default BasketButton
