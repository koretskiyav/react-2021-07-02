import { useMemo } from 'react';
import Menu from './menu';
import Reviews from './reviews';
import Rate from './rate';

export default function Restaurant({ activeRestaurant }) {
  const sumRating = useMemo(
    () =>
      activeRestaurant.reviews.reduce((total, next) => total + next.rating, 0),
    [activeRestaurant.reviews]
  );
  const avgRating = Math.floor(sumRating / activeRestaurant.reviews.length);

  return (
    <div>
      <h1>Rating</h1>
      <Rate rating={avgRating} />
      <Menu menu={activeRestaurant.menu} />
      <Reviews reviews={activeRestaurant.reviews} />
    </div>
  );
}
