import { useState } from 'react';
import Restaurants from '../restaurants';
import Header from '../header';
import { UserProvider } from '../../contexts/user';
import { CurrencyProvider } from '../../contexts/currency';
import { currencies } from '../../constants';

const App = () => {
  const [name, setName] = useState('Andrey');
  const defaultCurrency = Object.keys(currencies)[0];
  const [currency, changeCurrency] = useState(defaultCurrency);

  return (
    <div>
      <UserProvider value={{ name, setName }}>
          <CurrencyProvider value={{ currency, changeCurrency }}>
              <Header />
              <Restaurants />
          </CurrencyProvider>
      </UserProvider>
    </div>
  );
};

export default App;
