export default (store) => (next) => async (action) => {
  if (!action.meta?.apiCall) return next(action);

  const { meta, ...rest } = action;

  const payload = await meta.apiCall();

  next({ ...rest, payload });
};
