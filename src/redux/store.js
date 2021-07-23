import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from './middleware/logger';
import generateId from './middleware/generateId';
import apiCall from './middleware/apiCall';

import reducer from './reducer';

const middleware = [apiCall, generateId, logger];

export default configureStore({
  reducer,
  middleware: getDefaultMiddleware({
    serializableCheck: { ignoredActionPaths: 'meta.apiCall' },
  }).concat(middleware),
});
