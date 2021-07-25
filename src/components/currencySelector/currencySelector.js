import { useContext } from 'react';

import Button from '../button';
import { currencies } from '../../constants';
import { currencyContext } from '../../contexts/currency';

import styles from './currencySelector.module.css';

const CurrencySelector = ({ heading, children }) => {
const { currency, changeCurrency } = useContext(currencyContext);

 return (
      <div className={styles.currencySelector}>
       {Object.keys(currencies).map((currencyItem) =>
          <Button
              onClick={() => changeCurrency(currencyItem)}
              secondary={currencyItem !== currency}
              primary={currencyItem === currency}
              key={currencyItem}
          >
              {currencyItem}
          </Button>
      )}
  </div>
  );
};

export default CurrencySelector;
