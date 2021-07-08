import React from 'react';
import Menu from './menu';
import Reviews from './reviews';

const Restaurant = (props) => {
  function averageRate() {
    if (props.restaurant.reviews) {
      let rateQuantity = 0;
      const rate = props.restaurant.reviews.reduce((sum, review) => {
        sum += review.rating;
        rateQuantity++;
        return sum;
      }, 0);
      return Math.round(rate / rateQuantity);
    }
  }

  return (
    <div>
      <Menu menu={props.restaurant.menu} />
      <Reviews rate={props.restaurant.reviews} value={averageRate()} />
    </div>
  );
};

export default Restaurant;
