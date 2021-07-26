import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from './middleware/logger';
import generateId from './middleware/generateId';

import reducer from './reducer';

const middleware = [generateId, logger];

export default configureStore({
  reducer,
  middleware: getDefaultMiddleware({
    serializableCheck: { ignoredActionPaths: 'meta.apiCall' }
  }).concat(middleware)
});
