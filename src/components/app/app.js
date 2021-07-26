import { useState } from 'react';
import Restaurants from '../restaurants';
import Header from '../header';
import { UserProvider } from '../../contexts/user';
import { CurrencyProvider } from '../../contexts/currency';
import useCurrency from '../../hooks/use-currency';


const App = () => {
  const [name, setName] = useState('Andrey');
  const [currency, setCurrency] = useState('USD');
  return (
    <div>
      <CurrencyProvider value={{ currency, setCurrency, formatPrice: useCurrency }}>
        <UserProvider value={{ name, setName }}>
          <Header />
          <Restaurants />
        </UserProvider>
      </CurrencyProvider>
    </div>
  );
};

export default App;
