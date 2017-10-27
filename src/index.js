// Modules
import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import validator from 'express-validation';
import logger from './helpers/logger.js';
import logs from './helpers/logs.js';
import { I18nMiddleware } from './middlewares';

// Routes
import routes from './routes';

// Connection database
import db from './db.js';

// Configuration application
import config from './config/index.js';

// Start server and express
let app = express();
app.server = http.createServer(app);

// Active logs managment
logs.init(app);

// Middlewares
app.use(bodyParser.json({limit: "50mb", parameterLimit: 100000}));
app.use(bodyParser.urlencoded({limit: "50mb", parameterLimit: 100000, extended: false}));
app.use(cors());
app.use(I18nMiddleware(config));

// Static folders
app.use(express.static('public'));

// Log errors
app.use(function(err, req, res, next) {
  logger.error(err);
  next(err);
});

// Listen port
app.server.listen(config.port);

// Event listener for HTTP server "error" event.
app.server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof config.port === 'string'
    ? 'Pipe ' + config.port
    : 'Port ' + config.port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.log('error', bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.log('error', bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

// Event listener for HTTP server "listening" event.
app.server.on('listening', () => {
  const addr = app.server.address();
  const bind = typeof addr === 'string'
    ? 'Pipe ' + addr
    : 'Port ' + addr.port;

  logger.log('info', 'Running in ' + config.env);
  logger.log('info', 'Started on ' + bind);
});

// Init routes
routes(app);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch error
app.use((err, req, res, next) => {
  const status = parseInt(err.code) || 500;

  // Production error handler, no stacktraces leaked to user
  let json = {
    status: status,
    message: err.message
  };

  res.status(status).json(json);
});

export default app;
