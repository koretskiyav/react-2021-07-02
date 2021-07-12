import Rate from './rate';

export default function Reviews({ reviews }) {
  return (
    <div>
      <p>Reviews: </p>
      {reviews.map((reviews) => (
        <div key={reviews.id}>
          <p>
            {reviews.user}: {reviews.text}
          </p>
          <Rate rating={reviews.rating} id={reviews.id} />
        </div>
      ))}
    </div>
  );
}
