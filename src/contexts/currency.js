import { createContext } from 'react';
export const currencyEnum = Object.freeze({ USD: 1, Euro: 2, Uah: 3 });

export const currencyContext = createContext({
  name: currencyEnum.USD,
  setCurrency: () => {},
});

export const CurrencyProvider = currencyContext.Provider;
export const CurrencyConsumer = currencyContext.Consumer;

export const calculatePrice = (piceInUs, currency) => {
  switch (currency) {
    case currencyEnum.Euro:
      return piceInUs * 0.75;
    case currencyEnum.Uah:
      return piceInUs * 27;
    default:
      return piceInUs;
  }
};
export const getSignFromCurrency = (currency) => {
  switch (currency) {
    case currencyEnum.Euro:
      return 'EUR';
    case currencyEnum.Uah:
      return 'UAH';
    default:
      return '$';
  }
};
