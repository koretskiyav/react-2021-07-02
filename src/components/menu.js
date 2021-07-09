import Product from './product';

import style from "./menu.module.css"

export default function Menu({ menu }) {
  return (
    <div className={style.menu}>
      {menu.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
