import { createContext, useMemo, useState } from 'react';

export const currencyContext = createContext();

export const CurrencyProvider = ({ dictionary, children }) => {
  const currencies = useMemo(() => Object.values(dictionary), [dictionary]);

  const [currentCurrencyCode, setCurrentCurrencyCode] = useState('USD');

  const setCurrency = (code) => setCurrentCurrencyCode(code);

  return (
    <currencyContext.Provider
      value={{
        currencies,
        currency: dictionary[currentCurrencyCode],
        setCurrency,
      }}
    >
      {children}
    </currencyContext.Provider>
  );
};

export const CurrencyConsumer = currencyContext.Consumer;
