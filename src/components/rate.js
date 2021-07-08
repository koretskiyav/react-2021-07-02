import { ReactComponent as FullStarSVG } from '../icons/star.svg';
import { ReactComponent as EmptyStarSVG } from '../icons/star-empty.svg';
import classes from './rate.module.css';

export default function Rate({star}) {
  let stars = [];

  for (let i = 0; i < 5; i++) {
    if (star > i) {
      stars.push('fullStar');
    } else {
      stars.push('emptyStar');
    }
  }

  console.log(stars);

  return (
    <div>
      {
        stars.map((item, index) => {
        if (item === 'fullStar') {
          return (<span key={index} className={classes.wrapStar}><FullStarSVG /></span>)
        } else {
          return (<span key={index} className={classes.wrapStar}><EmptyStarSVG /></span>)
        }

      })
    }</div>
  )
}