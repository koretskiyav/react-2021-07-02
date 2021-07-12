import { ReactComponent as Star } from '../icons/star-filled.svg';
import style from './product.module.css';

export default function Rate({ rating, id }) {
  const starRating = [];
  // for (let i = 0; i < rating; i++) {
  //   starRating.push(<Star key={id} className={style.icon_star} />);
  // }
  starRating.map((star, index) => {
    return index <= rating ? (
      <Star key={id} className={style.icon_star} />
    ) : null;
  });
  return <div>{starRating}</div>;
}
