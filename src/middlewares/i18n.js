const i18next = require('i18next');
const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-node-fs-backend');
const path = require('path');

const i18n = (config) => {
  i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
      backend: {
        loadPath: path.join(__dirname, '/../locales/{{lng}}.json'),
        crossDomain: true
      },
      fallbackLng: config.locale.default,
      preload: config.locale.all,
      saveMissing: true
    });

  return i18nextMiddleware.handle(i18next);
}

export default i18n;