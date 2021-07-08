import { ReactComponent as Star } from '../../icons/star.svg';
import { ReactComponent as StarPlus } from '../../icons/star_plus.svg';

import style from './rate.module.css';

export default function Rate(props) {

  const maxRate = 5;
  const { rating } = props;

  return (
    <div>
      {
        [...Array(maxRate)].map((e, i) =>
          i + 1 <= rating ?
            <StarPlus key={i++} className={style.star} />
            :
            <Star key={i++} className={style.star} />
        )
      }
    </div>
  );
}