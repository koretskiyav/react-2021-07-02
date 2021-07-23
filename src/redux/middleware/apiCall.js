import { FAILURE, REQUEST, SUCCESS } from '../constants';

export default (store) => (next) => async (action) => {
  if (!action.meta?.apiCall) return next(action);

  const { meta: _meta, type, ...rest } = action;
  const { apiCall, ...meta } = _meta;

  next({ ...rest, type: type + REQUEST, meta });

  try {
    const payload = await apiCall();
    next({ ...rest, type: type + SUCCESS, meta, payload });
  } catch (error) {
    next({ ...rest, type: type + FAILURE, meta, error });
  }
};
