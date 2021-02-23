// @flow
import { initialize, pushToGTM } from "./GoogleTagManager";
import { getProdConfig } from "./GoogleTagManager.constants";
import type {
  GTMEventParams,
  TSharedEventConfig,
} from "./GoogleTagManager.types";

// eslint-disable-next-line fp/no-let
let sharedEventConfig: TSharedEventConfig;

export const init = (
  eventConfig: TSharedEventConfig,
  dataLayer?: Object
): Promise<*> => {
  // Already Initialized
  if (window.dataLayer) {
    return Promise.resolve();
  }

  // eslint-disable-next-line fp/no-mutation
  sharedEventConfig = eventConfig;

  const gtmConfig = dataLayer ? getProdConfig(dataLayer) : getProdConfig();

  return initialize(gtmConfig);
};

export const trackEvent = ({ event, payload = {} }: GTMEventParams) => {
  const params = {
    event,
    payload: {
      ...sharedEventConfig,
      ...payload,
    },
  };

  pushToGTM(params);
};
