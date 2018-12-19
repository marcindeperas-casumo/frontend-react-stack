import config from "Src/config";
import createTracker from "Lib/tracker";
import createAdapterMixpanel from "Lib/tracker.adapter.mixpanel";

const { mixpanelToken, mixpanelProjectName } = config;
const mixpanelConfig = { mixpanelToken, mixpanelProjectName };
const adapterMixpanel = createAdapterMixpanel(mixpanelConfig);
const adapters = [adapterMixpanel];
const tracker = createTracker(adapters);

export default tracker;

export const track = tracker.track;

export const setState = tracker.setState;
