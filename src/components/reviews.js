import Review from './review';

export default function Reviews({ reviews }) {
    return (
        <div>
            {reviews.map((review) => (
                <Review key={review.id} {...review} />
            ))}
        </div>
    );
}