import { connect } from 'react-redux';

import useForm from '../../../hooks/use-form';
import Rate from '../../rate';
import Button from '../../button';
import { addreview } from '../../../redux/features/reviews';
import { addUser } from '../../../redux/features/users';
import styles from './review-form.module.css';

const INITIAL_VALUES = { name: '', text: '', rating: 3 };

const ReviewForm = ({ onSubmit }) => {
  const { values, handlers, reset } = useForm(INITIAL_VALUES);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    onSubmit(values);
    reset();
  };

  return (
    <div className={styles.reviewForm}>
      <h4 className={styles.addReviewTitle}>Leave your review</h4>
      <form onSubmit={handleSubmit}>
        <div className={styles.reviewFormItem}>
          <input
            placeholder="Your name"
            className={styles.message}
            {...handlers.name}
          />
        </div>
        <div className={styles.reviewFormItem}>
          <textarea
            placeholder="Your review"
            className={styles.message}
            {...handlers.text}
          />
        </div>
        <div className={styles.rateWrap}>
          <span>Rating: </span>
          <span>
            <Rate {...handlers.rating} />
          </span>
        </div>
        <div className={styles.publish}>
          <Button primary block>
            PUBLISH REVIEW
          </Button>
        </div>
      </form>
    </div>
  );
};
// function submit() {
//   return function(dispatch) {
//     dispatch({
//       type: 'NAVIGATION/NAVIGATE',
//       location: {name: 'documentEdit', {id: data.id}},
//     )
//     dispatch({
//       type: 'DOCUMENT_VIEW/RESET',
//       id: data.id,
//     })
//     dispatch({
//       type: 'DOCUMENT_DATA/POST',
//       data,
//     })
//   }
// }
// }
export default connect(null, (dispatch) => ({
  onSubmit: ({ name, text, rating }) =>
    dispatch(addreview('', '', text, rating, name)),
}))(ReviewForm);
