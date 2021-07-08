import React from 'react';
import Rate from './rate';

const Reviews = (props) => {
  let usersRewiews = props.rate.map((review) => {
    return (
      <div key={review.id}>
        <h4>{review.user}</h4>
        <Rate value={review.rating} />
        <p>{review.text}</p>
        <hr />
      </div>
    );
  });

  return (
    <>
      <h2>Reviews</h2>
      <Rate value={props.value} />
      <hr />
      {usersRewiews}
    </>
  );
};

export default Reviews;
