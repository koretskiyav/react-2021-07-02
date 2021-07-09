import { useMemo } from 'react';
import Menu from './menu';
import Reviews from './reviews';
import Rate from './rate';

function Restaurant({ menu, reviews }) {
  const rating = useMemo(
    () =>
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
    [reviews]
  );

  return (
    <>
      <Rate value={rating} />
      <Menu menu={menu} />
      <Reviews reviews={reviews} />
    </>
  );
}

export default Restaurant;
