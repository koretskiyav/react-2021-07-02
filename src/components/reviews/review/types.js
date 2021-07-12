import PropTypes from 'prop-types';

export const ReviewType = PropTypes.shape({
  user: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
});
