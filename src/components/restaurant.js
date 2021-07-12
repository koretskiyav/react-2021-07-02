import Menu from './menu';
import Reviews from './reviews';
import Rate from './rate';
import classes from './restaurant.module.css'

export default function Restaurant({...props}) {
  const rateArray = props.reviews.map((item) => {
    return item.rating;
  });
  console.log("массив рейтига", rateArray);
  const value = rateArray.reduce((sum, current) => sum + current, 0);
  console.log("общее число", value);
  const middleRate = Math.round(value/rateArray.length);
  console.log('Средний рейтинг', middleRate);
  return (
    <div>
      <Menu menu={props.menu} />
      <Reviews reviews={props.reviews} />
      <div className={classes.middleRateBox}>
        <span className={classes.middleRateBoxTitle}>Общий рейтинг:</span> <Rate star={middleRate}/>
      </div>
    </div>
  )
}