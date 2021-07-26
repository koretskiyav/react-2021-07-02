import { useContext } from 'react';
import { currencyContext } from '../../contexts/currency';
const Money = () => {
  const { setCurrency } = useContext(currencyContext);
  return (
    <div>
      <select
        onChange={(event) => setCurrency(event.target.value)}
        name="currency"
        size="1"
      >
        <option value="USD" defaultValue>
          USD
        </option>
        <option value="EUR">EUR</option>
        <option value="RUB">RUB</option>
      </select>
    </div>
  );
};

export default Money;
