import { ReactComponent as Minus } from '../../icons/minus.svg';
import { ReactComponent as Plus } from '../../icons/plus.svg';
import counter from '../../hocs/counter';
import style from './product.module.css';

function Product({ product, amount, decrement, increment }) {
  return (
    <div className={style.card}>
      <p>{product.name}</p>
      <p>{product.price} $</p>
      <button onClick={decrement}>
        <Minus className={style.icon} />
      </button>
      <span>{amount}</span>
      <button onClick={increment}>
        <Plus className={style.icon} />
      </button>
    </div>
  );
}

export default counter(Product);
