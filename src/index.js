import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import App from './components/app';
import { MoneyProvider } from './contexts/money';

import store from './redux/store';

// DEV ONLY!!!
window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MoneyProvider>
        <App />
      </MoneyProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
