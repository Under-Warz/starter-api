import models from '../models';
import moment from 'moment';

class AuthMiddleware {
  // Check that user is logged before accessing resource
  static authorize(req, res, next) {

  }

  // Check user can perform the action
  static can(action) {
    const error = new Error('You are not allowed to access this resource');
    error.code = 401;

    return (req, res, next) => {
      // Define here all the actions and the roles attached
      const actions = {

      };

      if (Object.keys(actions).indexOf(action) === -1) {
        let noActionError = new Error('The action \'' + action + '\' doesn\'t exists');
        noActionError.code = 400;

        return next(noActionError);
      }

      next();
    };
  }
}

export default AuthMiddleware;
