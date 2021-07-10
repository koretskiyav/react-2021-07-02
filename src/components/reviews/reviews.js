import Review from '../review/review';
import style from './reviews.module.css';

export default function Reviews ({reviews}) {

	return (
		<div className={style.card}>
			{
				reviews.map((review, key) => (
					<Review key={key} user={review.user} text={review.text} rating={review.rating}/>
				))
			}
		</div>
	)
}