import { ReactComponent as Star } from '../icons/star-filled.svg';
import style from './product.module.css';

export default function Rate({ rating }) {
  const starRating = [];
  for (let i = 0; i < rating; i++) {
    starRating.push(<Star className={style.icon_star} />);
  }
  return <div>{starRating}</div>;
}
