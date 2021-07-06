export default function Product({ product }) {
  return (
    <div>
      <p>{product.name}</p>
      <p>{product.price} $</p>
    </div>
  );
}
