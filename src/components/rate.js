import { ReactComponent as Star } from '../icons/star.svg';
import style from './rate.module.css';

export default function Rate({ rating, type }) {
  const stars = [];

  for (let i = 0; i < rating; i++) {
    stars.push(<Star key={i} className={style.icon} />);
  }

  return (
    <div className={style.rating}>
      {type}: {stars}
    </div>
  );
}
