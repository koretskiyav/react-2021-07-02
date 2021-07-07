import Menu from './menu';
import Reviews from './reviews';
import Rate from './rate';

export default function Restaurant({ restaurant }) {
  const avrgRating =
    restaurant.reviews.reduce((acc, curVal) => {
      return acc + curVal.rating;
    }, 0) / restaurant.reviews.length;

  return (
    <div>
      <Menu menu={restaurant.menu} />
      <Reviews reviews={restaurant.reviews} />
      <Rate rating={Math.floor(avrgRating)} type="Total rating" />
    </div>
  );
}
