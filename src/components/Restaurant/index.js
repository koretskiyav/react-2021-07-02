import { useMemo } from 'react';

import Menu from '../Menu';
import Reviews from '../Reviews';
import Rate from '../Rate';

export default function Restaurant({ restaurant }) {
  const avrgRating = useMemo(
    () =>
      restaurant.reviews.reduce((acc, curVal) => {
        return acc + curVal.rating;
      }, 0) / restaurant.reviews.length,
    [restaurant.reviews]
  );

  return (
    <div>
      <Menu menu={restaurant.menu} />
      <Reviews reviews={restaurant.reviews} />
      <Rate rating={Math.floor(avrgRating)} type="Total rating" />
    </div>
  );
}
