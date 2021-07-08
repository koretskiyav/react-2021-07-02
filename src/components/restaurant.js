import Menu from './menu';
import Reviews from './reviews';
import Rate from './rate';

export default function Restaurant({ activeRestaurant }) {
  const menu = activeRestaurant.menu;
  const reviews = activeRestaurant.reviews;
  const name = activeRestaurant.name;
  const ratings = activeRestaurant.reviews.map((reviews) => reviews.rating);
  const averageRating = ratings.reduce((a, b) => a + b) / ratings.length;

  return (
    <>
      <h2>{name}</h2>
      <Rate rating={averageRating} />
      <Menu menu={menu} />
      <Reviews reviews={reviews} />
    </>
  );
}
