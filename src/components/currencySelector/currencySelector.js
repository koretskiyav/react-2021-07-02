import { useContext } from 'react';

import Button from '../button';
import { currencies } from '../../constants';
import { currencyContext } from '../../contexts/currency';

import styles from './currencySelector.module.css';

const CurrencySelector = ({ heading, children }) => {
const { currency, changeCurrency } = useContext(currencyContext);

 return (
      <div className={styles.currencySelector}>
       {Object.keys(currencies).map((currencyId) =>
          <Button
              onClick={() => changeCurrency(currencyId)}
              secondary={currencyId !== currency}
              primary={currencyId === currency}
              key={currencyId}
          >
              {currencies[currencyId].label}
          </Button>
      )}
  </div>
  );
};

export default CurrencySelector;
