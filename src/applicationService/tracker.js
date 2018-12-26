import config from "Src/config";
import { getEnv } from "Utils";
import { ENVS } from "Src/constants";
import createTracker from "Lib/tracker";
import createAdapterMixpanel from "Lib/tracker.adapter.mixpanel";
import craeteAdapterNull from "Lib/tracker.adapter.null";

const tracker = createTracker(getAdapters());

export default tracker;

export const track = tracker.track;

export const setState = tracker.setState;

function getAdapters() {
  const env = getEnv();
  const adapterGetterByEnv = {
    [ENVS.TEST]: getAdaptersNull,
    [ENVS.DEVELOPMENT]: getAdaptersNull,
    [ENVS.PRODUCTION]: getAdaptersProd,
  };

  return adapterGetterByEnv[env]();
}

function getAdaptersNull() {
  const adapterNull = craeteAdapterNull();

  return [adapterNull];
}

function getAdaptersProd() {
  const { mixpanelToken, mixpanelProjectName } = config;
  const mixpanelConfig = { mixpanelToken, mixpanelProjectName };
  const adapterMixpanel = createAdapterMixpanel(mixpanelConfig);

  return [adapterMixpanel];
}
