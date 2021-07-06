import Product from './product';

export default function Menu({ menu }) {
  return (
    <div>
      <h1>Menu</h1>
      {menu.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
