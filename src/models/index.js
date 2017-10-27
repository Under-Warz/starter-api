import fs from 'fs';
import path from 'path';

import db from '../db';

const basename = path.basename(module.filename);
let models = {};

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = db.import(path.join(__dirname, file));
    models[model.name] = model;
  });

// Load associations
Object.keys(models).forEach(function(modelName) {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Load scopes
Object.keys(models).forEach(function(modelName) {
  if (models[modelName].loadScopes) {
    models[modelName].loadScopes(models);
  }
});

export default models;
