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

function getAdaptersProd() {
  const { mixpanelToken, mixpanelProjectName } = config;
  const mixpanelConfig = { mixpanelToken, mixpanelProjectName };
  const adapterMixpanel = createAdapterMixpanel(mixpanelConfig);

  return [adapterMixpanel];
}
