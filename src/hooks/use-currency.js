export default function useCurrency(price = 0, currency) {
  // не понял как сделать, не передавая currency
  const locales ='ru-RU';
  const courseRub = 73.75
  const courseEur = 0.85
  if(currency === 'RUB'){
    price = (price * courseRub).toFixed(0)
  }
  else if(currency === 'EUR'){
    price = (price * courseEur).toFixed(1)
  }
  return new Intl.NumberFormat(locales, {
      currency,
      style: 'currency',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 0,
  }).format(price);
}

