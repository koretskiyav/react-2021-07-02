import { ReactComponent as Star } from '../icons/star.svg';
import styles from './rate.module.css';

export default function Rating({ rating }) {
  const totalStarAmount = 5;
  return [...Array(totalStarAmount).keys()].map((i) => (
    <Star className={i <= rating ? styles.goldStar : styles.greyStar} key={i} />
  ));
}
