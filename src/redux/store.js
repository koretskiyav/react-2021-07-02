import { applyMiddleware, createStore } from 'redux';
import logger from './middleware/logger';

import reducer from './reducer';

export default createStore(reducer, applyMiddleware(logger));
