import { useState } from 'react';
import Restaurants from '../restaurants';
import Header from '../header';
import { UserProvider } from '../../contexts/user';
import { CurrencyProvider, currencyEnum } from '../../contexts/currency';

const App = () => {
  const [name, setName] = useState('Andrey');
  const [currentCurrency, setCurency] = useState(currencyEnum.USD);
  return (
    <div>
      <UserProvider value={{ name, setName }}>
        <Header />
        <CurrencyProvider value={{ currentCurrency, setCurency }}>
          <Restaurants />
        </CurrencyProvider>
      </UserProvider>
    </div>
  );
};

export default App;
