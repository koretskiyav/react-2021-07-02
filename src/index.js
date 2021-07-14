import { Provider } from 'react-redux';
import './index.css';

import App from './components/app';
import ReactDOM from 'react-dom';
import { restaurants } from './fixtures';
import store from './redux/store';

// DEV ONLY!!!
window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <App restaurants={restaurants} />
  </Provider>,
  document.getElementById('root')
);
