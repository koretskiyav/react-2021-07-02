import { ReactComponent as Star } from '../icons/star.svg';
import style from "./rate.module.css";

export default function Rate({ value }) {
    const stars = (Array.apply(null, Array(value)).map(() => 1));
    return (
        <div>
            {stars.map((value, key) => <Star className={style.icon} key={key} />)}
        </div>
    );
}
