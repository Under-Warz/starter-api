import models from '../models';

class AppMiddleware {
  // Check X-App-Token validity
  static authorize(req, res, next) {
    const error = new Error('Your app\'s token is not authorized to consume this API');
    error.code = 401;

    if (!req.headers['x-app-token'] || req.headers['x-app-token'] != 'X-APP-TOKEN-HERE') return next(error);

    next();
  }
}

export default AppMiddleware;
