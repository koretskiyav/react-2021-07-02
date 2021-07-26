import { createContext } from 'react';

export const currencyContext = createContext({
  currency: 'USD',
  setcurrency: () => {},
  formatPrice: () => {},
});

export const CurrencyProvider = currencyContext.Provider;
