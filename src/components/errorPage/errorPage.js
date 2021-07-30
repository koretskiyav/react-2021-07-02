import PropTypes from 'prop-types';

import styles from './errorPage.module.css';
import { connect } from 'react-redux';

const ErrorPage = ({ message }) => (
  <div className={styles.banner}>
    <p>Error Page!</p>
    {message && <p className={styles.message}> {message}</p>}
  </div>
);

ErrorPage.propTypes = {
  message: PropTypes.string,
};
const mapStateToProps = (state) => {
  return {
    message: state.router.location.state,
  };
};

export default connect(mapStateToProps, null)(ErrorPage);
