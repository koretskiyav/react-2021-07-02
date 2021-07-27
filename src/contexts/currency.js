import { createContext } from 'react';
import { currencies } from '../constants';

export const currencyContext = createContext({
  currency: Object.keys(currencies)[0],
  changeCurrency: () => {}
});

export const CurrencyProvider = currencyContext.Provider;
export const CurrencyConsumer = currencyContext.Consumer;
