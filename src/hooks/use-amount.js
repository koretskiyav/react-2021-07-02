import { useState } from 'react';
import PropTypes from 'prop-types';

function useAmount(initialAmount) {
  const [amount, setAmount] = useState(initialAmount);

  const decrement = () => setAmount(amount > 0 ? amount - 1 : 0);
  const increment = () => setAmount(amount + 1);

  return { amount, decrement, increment };
}

useAmount.propTypes = {
  initialAmount: PropTypes.number.isRequired,
};

export default useAmount;
