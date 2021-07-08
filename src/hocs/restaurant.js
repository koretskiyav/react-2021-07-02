import Menu from '../components/menu.js';
import Reviews from './reviews.js';
import RatingMean from '../components/ratingMean.js';

export default function Restaurant({menu, reviews}) {
  return (
    <div className={'restaurant'}>
      <Menu menu={menu} />
      <RatingMean reviews={reviews} />
      <Reviews reviews={reviews} />
    </div>
  );
}
