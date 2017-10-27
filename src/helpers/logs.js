const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');

module.exports = {
  init: function(app) {
    // Access logs
    const logDirectory = path.join(__dirname, '..', '..', 'logs');
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

    var accessLogStream = rfs('access.log', {
      interval: '1d', // rotate daily
      path: logDirectory
    });

    app.use(morgan('combined', {stream: accessLogStream}));
  }
}
