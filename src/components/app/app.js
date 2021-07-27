import { useState } from 'react';
import { Route } from 'react-router-dom';
import Restaurants from '../restaurants';
import Header from '../header';
import Basket from '../basket';
import { UserProvider } from '../../contexts/user';

const App = () => {
  const [name, setName] = useState('Andrey');
  return (
    <div>
      <UserProvider value={{ name, setName }}>
        <Header />
        <Route path="/checkout" component={Basket} />
        <Route path="/restaurants/:restId" component={Restaurants} />
      </UserProvider>
    </div>
  );
};

export default App;
