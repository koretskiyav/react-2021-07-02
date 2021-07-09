import style from './review.module.css';

import Rate from '../../Rate';

export default function Review({ user, text, rating }) {
  return (
    <div className={style.block}>
      <figure>
        <blockquote cite="https://www.huxley.net/bnw/four.html">
          <p>{text}</p>
        </blockquote>
        <figcaption>— {user}</figcaption>
        <div>
          <Rate rating={rating} type="My rating" />
        </div>
      </figure>
    </div>
  );
}
