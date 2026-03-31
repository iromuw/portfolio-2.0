// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  fallbackLng: 'en',
  defaultNS: 'common',
  localePath:
    typeof window === 'undefined'
      ? path.resolve('./public/locales') // Server side
      : '/locales', // Client side
};
