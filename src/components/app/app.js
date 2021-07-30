import { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Restaurants from '../restaurants';
import Header from '../header';
import Basket from '../basket';
import OrderSuccess from '../order-success';
import OrderError from '../order-error';

import { UserProvider } from '../../contexts/user';

const App = () => {
  const [name, setName] = useState('Andrey');
  return (
    <div>
      <UserProvider value={{ name, setName }}>
        <Header />
        <Switch>
          <Redirect exact from="/" to="/restaurants" />
          <Route path="/checkout" component={Basket} />
          <Route path="/restaurants" component={Restaurants} />
          <Route path="/order-success" component={OrderSuccess} />
          <Route path="/order-error" component={OrderError} />
          <Route path="/error" component={() => <p>Error Page!</p>} />
          <Route path="/" component={() => <p>404 - Page Not Found :(</p>} />
        </Switch>
      </UserProvider>
    </div>
  );
};

export default App;
