import Sequelize from 'sequelize';
import Config from './config/index.js';
import logger from './helpers/logger.js';

const db = () => {

  const sequelize = new Sequelize(Config.database.database, Config.database.username, Config.database.password, Config.database);

  sequelize
    .authenticate()
    .then(() => {
      logger.info('Connected to local database ' + Config.database.database);
    })
    .catch((err) => {
      throw new Error(err);
    });

  return sequelize;

};

export default db();
