import { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Restaurants from '../restaurants';
import Header from '../header';
import Basket from '../basket';
import ErrorPage from '../errorPage';
import SuccessPage from '../successPage';
import { UserProvider } from '../../contexts/user';

const App = () => {
  const [name, setName] = useState('Andrey');
  return (
    <div>
      <UserProvider value={{ name, setName }}>
        <Header />
        <Switch>
          <Route path="/checkout" component={Basket} />
          <Route path="/restaurants" component={Restaurants} />
          <Route path="/error" component={ErrorPage} />
          <Route path="/success" component={SuccessPage} />
          <Redirect from={'/'} to={`/restaurants`} />
          <Route path="/" component={() => <p>404 - Page Not Found :</p>} />
        </Switch>
      </UserProvider>
    </div>
  );
};

export default App;
