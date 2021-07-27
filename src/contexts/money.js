import { createContext, useState, useContext } from 'react';

const moneyContext = createContext();

const currenciesMap = {
  USD: { label: 'USD', rate: 1, digits: 2 },
  EUR: { label: 'EUR', rate: 1 / 1.18, digits: 2 },
  RUB: { label: 'RUB', rate: 74, digits: 0 },
  UAH: { label: 'UAH', rate: 27, digits: 0 },
};

const currencies = Object.entries(currenciesMap).map(([key, { label }]) => ({
  key,
  label,
}));

const formaBuilder =
  ({ label, rate, digits }) =>
  (amount) =>
    new Intl.NumberFormat('ru-RU', {
      currency: label,
      style: 'currency',
      currencyDisplay: 'symbol',
      currencySign: 'accounting',
      minimumFractionDigits: digits,
    }).format(rate * amount);

export function MoneyProvider({ children }) {
  const [currency, setCurrency] = useState('USD');
  const config = currenciesMap[currency];
  const m = formaBuilder(config);

  return (
    <moneyContext.Provider value={{ currencies, currency, setCurrency, m }}>
      {children}
    </moneyContext.Provider>
  );
}

export function Money({ value }) {
  const { m } = useContext(moneyContext);
  return m(value);
}

export default moneyContext;
