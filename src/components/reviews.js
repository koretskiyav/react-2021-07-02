import Rate from './rate';

export default function Reviews({ reviews }) {
  return (
    <div>
      { reviews.map((review, i) => (
        <div key={i}>
         <p>{review.user}</p>
         <p>{review.text} </p>
         <Rate value={review.rating} />
         </div>))
      }
    </div>
  );
}
