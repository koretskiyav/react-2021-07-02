import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Restaurants from '../restaurants';
import Header from '../header';
import Basket from '../basket';
import { UserProvider } from '../../contexts/user';
import { Redirect } from 'react-router-dom'

const App = () => {
  const [name, setName] = useState('Andrey');
  return (
    <div>
      <UserProvider value={{ name, setName }}>
        <Header />
        <Switch>
          <Route path="/" component={() => <Redirect to="/restaurants" />} exact />
          <Route path="/checkout" component={Basket} />
          <Route path="/restaurants" component={Restaurants} />
          <Route path="/error" component={() => <p>Error Page!</p>} />
          <Route path="/" component={() => <p>404 - Page Not Found :(</p>} />
        </Switch>
      </UserProvider>
    </div>
  );
};

export default App;
