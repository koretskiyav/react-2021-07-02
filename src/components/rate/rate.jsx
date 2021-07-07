import { ReactComponent as StarFilled } from '../../icons/star-filled.svg'
import { ReactComponent as StarUnfilled } from '../../icons/star-unfilled.svg'
import { useMemo } from 'react'
import styles from './rate.module.css'

const MAX_RATING = 5

const Rate = ({ value }) => {

  const rating = useMemo(() => {
    if (typeof value !== 'number' || value === NaN)
      return 0;

    if (value > MAX_RATING)
      return MAX_RATING;

    if (value < 0)
      return 0;

    return Math.round(value);
  }, [value])

  const stars = useMemo(() => {
    const unfilled = MAX_RATING - rating;
    const filled = rating;

    const filledArray = new Array(filled).fill(true);
    const unfilledArray = new Array(unfilled).fill(false);

    return filledArray.concat(unfilledArray);
  }, [rating])

  return (
    <div className={styles['star-container']}>
        {stars.map(star => (
          star ? <StarFilled /> : <StarUnfilled />
        ))}
    </div>
  )
}

export default Rate
