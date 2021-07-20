import { FAILURE, REQUEST, SUCCESS } from '../constants';

export default (store) => (next) => async (action) => {
  if (!action.meta?.apiCall) return next(action);

  const { meta, type, ...rest } = action;
  next({ ...rest, type: type + REQUEST });

  try {
    const payload = await meta.apiCall();
    next({ ...rest, type: type + SUCCESS, payload });
  } catch (error) {
    next({ ...rest, type: type + FAILURE, error });
  }
};
