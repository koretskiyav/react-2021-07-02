import Review from "./review";
import Rate from "./rate";

function Reviews({ reviews, rate }) {
    return (
        <div>
            {reviews.map((review) => <Review key={review.id} review={review} />)}
            <Rate value={rate} />
        </div>
    );
}

export default Reviews;
