// @flow
import config from "Src/config";
import createTracker from "Lib/tracker";
import createAdapterMixpanel from "Lib/tracker.adapter.mixpanel";
import createAdapterLog from "Lib/tracker.adapter.log";
import logger from "Services/logger";

const tracker = getTracker();

export default tracker;

export function getTracker() {
  return createTracker(__DEV__ ? getAdaptersDev() : getAdaptersProd());
}

function getAdaptersDev() {
  if (process.env.NODE_ENV === "test") {
    return [];
  }

  const adapterLog = createAdapterLog(logger);

  return [adapterLog];
}

/**
 * NOTE: to enable tracking on GTM, add gtm adapter to the array
 * import createAdapterGTM from "Lib/tracker.adapter.gtm";
 * const adapterGTM = createAdapterGTM();
 */
function getAdaptersProd() {
  const { mixpanelToken, mixpanelProjectName } = config;
  const mixpanelConfig = { mixpanelToken, mixpanelProjectName };
  const adapterMixpanel = createAdapterMixpanel(mixpanelConfig);

  return [adapterMixpanel];
}
