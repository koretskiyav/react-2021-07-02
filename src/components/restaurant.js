import Menu from './menu';
import Reviews from './reviews';
import Rate from './rate';

export default function Restaurant({ restaurant }) {
  const average =
    restaurant.reviews.reduce((total, next) => total + next.rating, 0) /
    restaurant.reviews.length;
  return (
    <div>
      <h3>Menu</h3>
      <Menu menu={restaurant.menu}></Menu>
      <h3>Reviews</h3>
      <Reviews reviews={restaurant.reviews} />
      <h3>Average rating</h3>
      <Rate rate={average} />
    </div>
  );
}
