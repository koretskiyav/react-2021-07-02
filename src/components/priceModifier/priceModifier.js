import PropTypes from 'prop-types';
import { CurrencyConsumer } from '../../contexts/currency';

const PriceModifier = ({ price }) => {
  return (
    <CurrencyConsumer>
      {({ currency: { course, sign } }) =>
        `${parseFloat((price * course).toFixed(2))} ${sign}`
      }
    </CurrencyConsumer>
  );
};

PriceModifier.propTypes = {
  price: PropTypes.number.isRequired,
};

export default PriceModifier;
