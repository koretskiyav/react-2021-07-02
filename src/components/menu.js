import Product from './product';

export default function Menu({ menu }) {
  return (
    <div>
      <h2>Menu</h2>
      {menu.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
