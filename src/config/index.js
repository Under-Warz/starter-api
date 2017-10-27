const config = () => {
  try {
    if (process.env.NODE_ENV === 'test') {
      return require('./test.json');
    }
    else {
      return JSON.parse(process.env.config);
    }
  } catch(e) {
    return require('./dev.json').env.config;
  }
};

export default config();
