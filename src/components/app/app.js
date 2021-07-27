import { useState } from 'react';
import Restaurants from '../restaurants';
import Header from '../header';
import { UserProvider } from '../../contexts/user';
import { CurrencyProvider } from '../../contexts/currency';
import currencies from '../../currencies';

const App = () => {
  const [name, setName] = useState('Andrey');
  return (
    <div>
      <UserProvider value={{ name, setName }}>
        <CurrencyProvider dictionary={currencies}>
          <Header />
          <Restaurants />
        </CurrencyProvider>
      </UserProvider>
    </div>
  );
};

export default App;
