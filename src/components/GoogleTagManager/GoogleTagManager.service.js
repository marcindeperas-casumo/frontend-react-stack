// @flow
import { initialize, pushToGTM } from "./GoogleTagManager";
import type { GTMEventParams } from "./GoogleTagManager.types";
import { getProdConfig } from "./GoogleTagManager.constants";

export const init = () => {
  // Already Initialized
  if (window.dataLayer) {
    return;
  }

  // @todo: add defalt values to data layer and pass here
  const gtmConfig = getProdConfig();

  initialize(gtmConfig);
};

export const trackEvent = ({ event, payload = {} }: GTMEventParams) => {
  // todo: add extra payload params
  // affTrackId, btag, userId, userStatus, isTestSubjectIdReady

  const params = {
    event,
    payload,
  };

  pushToGTM(params);
};
