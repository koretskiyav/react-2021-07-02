import Menu from './menu';
import Reviews from './reviews';

export default function Restaurant({ activeRestaurant }) {
  return (
    <div>
      <Menu menu={activeRestaurant.menu} />
      <Reviews reviews={activeRestaurant.reviews} />
    </div>
  );
}
