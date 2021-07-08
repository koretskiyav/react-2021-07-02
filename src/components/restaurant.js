import Menu from './menu';
import Rate from './rate/index';
import Reviews from './reviews';

export default function Restaurant(props) {
  const { restaurant } = props;
  let avgRating = restaurant?.reviews.reduce((a, b) => a + (b['rating']), 0) / restaurant.reviews.length;

  return (
    <div>
      <Menu menu={restaurant.menu} name={restaurant.name} />
      <h4>
        Общий рейтинг ресторана <Rate rating={Math.round(avgRating)} />
      </h4>
      <Reviews reviews={restaurant.reviews} />
    </div>
  );
}