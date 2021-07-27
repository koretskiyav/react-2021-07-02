import { configureStore } from '@reduxjs/toolkit';
import logger from './middleware/logger';
import generateId from './middleware/generateId';

import reducer from './reducer';

const middleware = (getDefaultMiddleware) => [
  ...getDefaultMiddleware(),
  generateId,
  logger,
];

export default configureStore({ reducer, middleware });
