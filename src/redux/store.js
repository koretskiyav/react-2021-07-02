import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from './middleware/logger';
import generateId from './middleware/generateId';
import apiCall from './middleware/apiCall';

import reducer from './reducer';

const middleware = [apiCall, generateId, logger];

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
