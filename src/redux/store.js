import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import  addReview from './middleware/addReview';
import logger from './middleware/logger';

import reducer from './reducer';

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(logger, addReview))
);
