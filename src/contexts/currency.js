import { createContext } from 'react';
export const currencyEnum = Object.freeze({ USD: 1, Euro: 2, Uah: 3 });
export const currencyContext = createContext({
  name: currencyEnum.USD,
  setCurrency: () => {},
});

export const CurrencyProvider = currencyContext.Provider;
export const CurrencyConsumer = currencyContext.Consumer;
