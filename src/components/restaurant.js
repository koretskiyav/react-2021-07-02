import { useMemo } from 'react';
import Menu from './menu';
import Reviews from './reviews';

export default function Restaurant({ menu, reviews }) {
  const middleRate = useMemo(() => {
    const rate = reviews.map(({ rating }) => {
      return rating;
    });
    return Math.round(rate.reduce((a, b) => a + b) / rate.length);
  }, [reviews]);
  return (
    <div>
      <Menu menu={menu} />
      <Reviews reviews={reviews} middleRate={middleRate} />
    </div>
  );
}
