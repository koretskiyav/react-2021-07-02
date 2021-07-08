import Rate from './rate';

export default function Reviews({ reviews }) {
  return (
    reviews.map((review) =>
      <div>
        {review.user}
        {review.text}
        <Rate rating={review.rating}/>
      </div>
    )
  );
}
