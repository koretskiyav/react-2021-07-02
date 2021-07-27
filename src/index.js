import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';

import App from './components/app';
import { MoneyProvider } from './contexts/money';

import store from './redux/store';

// DEV ONLY!!!
window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <MoneyProvider>
      <App />
    </MoneyProvider>
  </Provider>,
  document.getElementById('root')
);
