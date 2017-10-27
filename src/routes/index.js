import Webservices from './webservices.js';

export default (app) => {
  app.use('/api/v1', Webservices);
};
