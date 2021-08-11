//this is an exception to regular game page notifications
//screen which has to be displayed in FULL screen mode

import React from "react";
import { IngameJackpotNotification } from "Components/PromotionalGameLists/BlueRibbonJackpot/IngameJackpotNotification";

export const FullScreenGamePageNotifications = () => {
  return <IngameJackpotNotification />;
};
