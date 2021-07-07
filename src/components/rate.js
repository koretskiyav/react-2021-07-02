import { ReactComponent as Star } from '../icons/rate.svg';
import style from './rate.module.css';

export default function Rate({rate}) {

  const rating = () => rate*20;

  return (
    <div >
      <div className={style.container}>
          <Star style={{width:rating()+'%'}} />
      </div>
    </div>
  )
}
