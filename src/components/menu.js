import Product from './product';

export default function Menu({ menu }) {
  return (
    <div className={'menu'}>
      {menu.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
