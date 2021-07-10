import {ReactComponent as Star} from '../../icons/star.svg'

import style from './rate.module.css';

export default function Rate ({value}) {
	const stars = Array(value).fill('star');

	return (
		<div>
			{
				stars.map((_, key) =>
					<Star key={key} className={style.icon} />
				)
			}
		</div>
	)
}