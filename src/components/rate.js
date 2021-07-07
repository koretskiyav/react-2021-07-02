import { ReactComponent as Star } from '../icons/star.svg';

import style from "./product.module.css";

export default function Rate({ value }) {
  return (
    <div>
        {Array(value).fill(0).map( (item, index) => <Star key={index} className={style.star} /> )}
    </div>
  );
}
