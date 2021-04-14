/**
 * This file exist because of errors with rollbar on chromatic
 * ie. "Cannot read property '_rollbarOldRemove' of undefined"
 *
 * This file will replace /src/applicationService/logger.js
 * on build time, check NormalModuleReplacementPlugin in webpack config.
 */
// eslint-disable-next-line fp/no-proxy
export default new Proxy(
  {},
  {
    // eslint-disable-next-line no-console
    get: () => console.log,
  }
);
