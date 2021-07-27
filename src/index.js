import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import './index.css';

import App from './components/app';
import { MoneyProvider } from './contexts/money';

import store from './redux/store';
import history from './history';

// DEV ONLY!!!
window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MoneyProvider>
        <App />
      </MoneyProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
