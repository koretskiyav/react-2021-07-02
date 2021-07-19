import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from './middleware/logger';
import uuid from './middleware/uuid';

import reducer from './reducer';

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(logger, uuid))
);
