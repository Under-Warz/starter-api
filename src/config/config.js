require('babel-core/register');

let configs = {};

// If staging/production
if (process.env.NODE_ENV !== 'dev' && process.env.NODE_ENV !== 'test') {
  const platformConfig = require('platformsh').config();

  if (platformConfig) {
    let staging = {};
    let production = {};

    const database = {
      dialect: "mysql",
      host: platformConfig.relationships.database[0].host,
      "username": platformConfig.relationships.database[0].username,
      "password": platformConfig.relationships.database[0].password,
      "database": platformConfig.relationships.database[0].path
    }

    // Prod
    if (platformConfig.branch === "master") {
      production = database;
    }
    // Staging
    else {
      staging = database;
    }

    configs = {
      "staging": staging,
      "production": production
    };
  }
}
// Dev
else {
  configs = {
    "dev": require('./dev.json').env.config.database,
    "test": require('./test.json').database
  };
}

module.exports = configs;
