// @flow
import * as React from "react";
import * as R from "ramda";
import { useFetch } from "Utils/hooks";
import { urls } from "../blueRibbonConsts";
import { BlueRibbonChristmasCampaignNotifications } from "./BlueRibbonChristmasCampaignNotifications";

export function BlueRibbonChristmasCampaignNotificationsContainer() {
  const { response } = useFetch(urls.handshake);
  const available = R.propOr(false, "available", response);

  if (!available) {
    return null;
  }

  return <BlueRibbonChristmasCampaignNotifications />;
}
