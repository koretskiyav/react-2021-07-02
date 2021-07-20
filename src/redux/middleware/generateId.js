import { v4 as uuid } from 'uuid';

export default (store) => (next) => (action) => {
  if (!action.meta?.generateId) return next(action);

  const { meta, ...rest } = action;

  next({
    ...rest,
    payload: {
      ...rest.payload,
      ...meta.generateId.reduce((acc, key) => ({ ...acc, [key]: uuid() }), {}),
    },
  });
};
