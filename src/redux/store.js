import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from './middleware/logger';
import idCreator from './middleware/idCreator';

import reducer from './reducer';

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(idCreator, logger))
);
