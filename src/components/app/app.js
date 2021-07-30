import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Restaurants from '../restaurants';
import Header from '../header';
import Basket from '../basket';
import OrderPage from '../order';
import { UserProvider } from '../../contexts/user';

const App = () => {
  const [name, setName] = useState('Andrey');
  return (
    <div>
      <UserProvider value={{ name, setName }}>
        <Header />
        <Switch>
          <Route path="/" exact component={Restaurants} />
          <Route path="/checkout" component={Basket} />
          <Route path="/restaurants" component={Restaurants} />
          <Route path="/error" component={() => <p>Error Page!</p>} />
          <Route path="/order" component={OrderPage} />
          <Route path="/" component={() => <p>404 - Page Not Found :(</p>} />
        </Switch>
      </UserProvider>
    </div>
  );
};

export default App;
