import Menu from './menu';
import Reviews from './reviews';
import Averagerating from './averagerating';

export default function Restaurant({menu,reviews}) {
  return (
    <div>
      <Menu  menu ={menu}/>
      <Reviews reviews = {reviews}/>
      <Averagerating reviews = {reviews}/>
    </div>
  )
}
