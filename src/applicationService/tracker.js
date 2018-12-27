import { getEnv } from "Utils";
import config from "Src/config";
import { ENVS } from "Src/constants";
import createTracker from "Lib/tracker";
import createAdapterMixpanel from "Lib/tracker.adapter.mixpanel";
import createAdapterLog from "Lib/tracker.adapter.log";
import logger from "Services/logger";

const tracker = createTracker(getAdapters());

export default tracker;

export const track = tracker.track;

export const setState = tracker.setState;

function getAdapters() {
  const env = getEnv();
  const adapterGetterByEnv = {
    [ENVS.TEST]: getAdaptersDev,
    [ENVS.DEVELOPMENT]: getAdaptersDev,
    [ENVS.PRODUCTION]: getAdaptersProd,
  };

  return adapterGetterByEnv[env]();
}

function getAdaptersDev() {
  const adapterLog = createAdapterLog(logger);

  return [adapterLog];
}

function getAdaptersProd() {
  const { mixpanelToken, mixpanelProjectName } = config;
  const mixpanelConfig = { mixpanelToken, mixpanelProjectName };
  const adapterMixpanel = createAdapterMixpanel(mixpanelConfig);

  return [adapterMixpanel];
}
