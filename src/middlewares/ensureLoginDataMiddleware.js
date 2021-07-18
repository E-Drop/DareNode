import errorsDispatcher from '../utils/errorsDispatcher.js';

const ensureLoginDataMiddleware = (req, res, next) => {
  const { username, password } = req.body;

  if (username && password) {
    return next();
  }
  return errorsDispatcher(res, 'BAD_REQUEST');
};

export default ensureLoginDataMiddleware;