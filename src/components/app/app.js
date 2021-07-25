import { useState } from 'react';
import Restaurants from '../restaurants';
import Header from '../header';
import { UserProvider } from '../../contexts/user';
import { CurrencyProvider } from '../../contexts/currency';

const App = () => {

  const [name, setName] = useState('Andrey');
  const [currency, changeCurrency] = useState('USD');
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
