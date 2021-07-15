import styles from '../item/item.module.css';
import Button from '../../button';
import PropTypes from 'prop-types';


function Item({ decrement, increment, remove, item }) {

  return (
    <div className={styles.items}>
      <Button
        onClick={decrement}
        icon='minus'
        data-id='basket-decrement'
      />
      <div className={styles.inner}>
        <p>Наименование: {item.name || 'Имя пропало'}</p>
        <p>Количество: {item.count}</p>
        <p>Цена: {item.price} $</p>
        <p>Сумма: {item.sumPrice}</p>
      </div>
      <Button
        onClick={increment}
        icon='plus'
        data-id='basket-increment'
      />
      <Button
        onClick={remove}
        icon='del'
        data-id='basket-remove'
      />
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    count: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    sumPrice: PropTypes.number.isRequired,

  }).isRequired,
  remove: PropTypes.func,
  increment: PropTypes.func,
  decrement: PropTypes.func,
};


export default Item;