import Menu from './menu'
import Reviews from './reviews';

import style from './restaurant.module.css'

export default function Restaurant ({restaurant: {menu, reviews}}) {
	return (
		<div className={style.restaurant}>
			<Menu menu={menu}/>
			<Reviews reviews={reviews}/>
		</div>
	)
};