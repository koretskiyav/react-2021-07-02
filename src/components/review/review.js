import Rate from '../rate/';

import style from './review.module.css';

export default function Review ({user, text, rating}) {

	return (
		<div>
			<p><b>{user}</b></p>
			<p><i>{text}</i></p>
				<div className={style.rating}>
					<p>Rating:</p>
					<Rate value={rating} />
				</div>
			<hr/>
		</div>
	)
}