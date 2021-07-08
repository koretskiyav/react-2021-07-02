import Product from './product/index';

export default function Menu({ menu, name }) {
  return (
    <div>
      <h1>Меню ресторана {name}</h1>
      {menu.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
