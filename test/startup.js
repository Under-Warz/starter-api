// Setup config
import config from '../src/config/test.json';
process.env.config = JSON.stringify(config);

//Require the dev-dependencies
import path from 'path';
import Sequelize from 'sequelize';
import Umzug from 'umzug';

import db from '../src/db.js';

// Migrate & cleanup database
before((done) => {
  let ACCESS_TOKEN = null;

  // Migrate database
  const migrator = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize: db,
      tableName: 'migrations'
    },
    logging: false,
    migrations: {
      params: [ db.getQueryInterface(), Sequelize ],
      path: path.join(process.cwd(), 'src', 'migrations'),
      pattern: /^\d+[\w-]+\.js$/
    }
  });

  // Rollback all first
  migrator.down({ to: 0 }).then(() => {
    // Migrate
    migrator.up().then(() => {
      // Finish up
      done();
    });
  });
});
