import { useMemo } from 'react';
import Menu from './menu';
import Reviews from './reviews';
import Rate from './rate';

import styles from './restaurant.module.css';

export default function Restaurant({ restaurant }) {
  const { menu, reviews } = restaurant;

  const commonRating = useMemo(() => {
    return Math.round(
      reviews.reduce((amount, { rating }) => (amount += rating), 0) /
        reviews.length
    );
  }, [reviews]);

  return (
    <>
      <div>
        <h2>Restaurant rating</h2>
        <div className={styles.rating}>
          <Rate rating={commonRating} />
          <b>{commonRating}</b>
        </div>
      </div>
      <Menu menu={menu} />
      <Reviews reviews={reviews} />
    </>
  );
}
