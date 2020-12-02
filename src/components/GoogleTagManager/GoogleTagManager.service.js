// @flow
import { initialize, pushToGTM } from "./GoogleTagManager";
import type { GTMEventParams } from "./GoogleTagManager.types";
import { getProdConfig } from "./GoogleTagManager.constants";

export const GoogleTagManagerService = function() {
  const init = (dataLayer?: Object) => {
    // Already Initialized
    if (window.dataLayer) {
      return;
    }

    const gtmConfig = dataLayer ? getProdConfig(dataLayer) : getProdConfig();

    initialize(gtmConfig);
  };

  const trackEvent = ({ event, payload = {} }: GTMEventParams) => {
    // @todo: add extra payload params
    // affTrackId, btag, userId, userStatus, isTestSubjectIdReady

    const params = {
      event,
      payload,
    };

    pushToGTM(params);
  };

  return Object.freeze({
    init,
    trackEvent,
  });
};
