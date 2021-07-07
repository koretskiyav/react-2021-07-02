
import Menu from './menu';
import Reviews from './reviews';
import Rate from './rate';
import style from './restaurant.module.css';

export default function Restaurant({ restaurant }) {

  //console.log(restaurant);
  let averageRating = Math.round(restaurant.reviews.reduce((prev, review) => prev + review.rating, 0) / restaurant.reviews.length);
  return (
    <div>
      <p>{restaurant.name} </p>
      <div className={style.container}>
        <div className={style.left}>
          <Menu menu={restaurant.menu} />
        </div>
        <div className={style.right}>
          <Reviews reviews={restaurant.reviews} />
          <p className={style.red}>Average rating: {averageRating} </p>
          <Rate value={averageRating} />
        </div>
      </div>
    </div>
  );
}
