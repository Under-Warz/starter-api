import path from 'path';
import Express from 'express';
import Validator from 'express-validation';

import {
  AppMiddleware,
  AuthMiddleware
} from '../middlewares';

// Controllers

const Router = Express.Router();

// App middleware
Router.all('*', AppMiddleware.authorize);

export default Router;
