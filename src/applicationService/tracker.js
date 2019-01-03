import { getEnv } from "Utils";
import config from "Src/config";
import { ENVS } from "Src/constants";
import createTracker from "Lib/tracker";
import createAdapterMixpanel from "Lib/tracker.adapter.mixpanel";
import createAdapterLog from "Lib/tracker.adapter.log";
import logger from "Services/logger";

const ADAPTER_GETTERS = {
  [ENVS.TEST]: getAdaptersDev,
  [ENVS.DEVELOPMENT]: getAdaptersDev,
  [ENVS.PRODUCTION]: getAdaptersProd,
};

const tracker = getTracker();

export const track = tracker.track;

export const setState = tracker.setState;

export default tracker;

export function getTracker(env = getEnv(), adapterGetters = ADAPTER_GETTERS) {
  const adapterGetter = adapterGetters[env];
  const emptyAdapters = [];
  const adapters = adapterGetter ? adapterGetter() : emptyAdapters;

  return createTracker(adapters);
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
