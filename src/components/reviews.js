import Review from './review';

export default function Reviews({ reviews }) {
  return (
    <div>
      <h1>Reviews</h1>
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
}
