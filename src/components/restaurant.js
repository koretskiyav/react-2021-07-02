import Menu from './menu';
import Reviews from './reviews';
import Rate from './rate';

export default function Restaurant({ restaurant }) {
  const { name, menu, reviews } = restaurant;
  const averageRating = reviews.reduce((acc, review) => review.rating + acc, 0) / reviews.length;

  return (
    <div>
      {name}
      <Rate rating={averageRating} />
      <Menu menu={menu} />
      <Reviews reviews={reviews}/>
    </div>
  );
}
