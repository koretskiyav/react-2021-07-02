import { ReactComponent as Minus } from '../icons/minus.svg';
import { ReactComponent as Plus } from '../icons/plus.svg';
import counter from '../hocs/counter';
import style from './product.module.css';

function Product({ product, amount, decrement, increment }) {
  return (
    <div className={style.card}>
      <p className={style.product_name}>{product.name}</p>
      <p className={style.product_price}>{product.price} $</p>
      <div className={style.product_nav}> 
      <button className={style.button} onClick={decrement}>
        <Minus className={style.icon} />
      </button>
      <span className={style.product_amount}>{amount}</span>
      <button className={style.button} onClick={increment}>
        <Plus className={style.icon} />
      </button>
      </div>
    </div>
  );
}

export default counter(Product);
