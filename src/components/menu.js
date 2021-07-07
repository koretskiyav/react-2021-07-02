import Product from './product';
import style from './menu.module.css';

export default function Menu({ menu }) {
  return (
    <div className={style.menu}>
      <div className={style.hedear}>MENU</div>
      <div className={style.menu_block}>
      {menu.map((product) => (
        <Product key={product.id} product={product} />
      ))}
      </div>
    </div>
  );
}
