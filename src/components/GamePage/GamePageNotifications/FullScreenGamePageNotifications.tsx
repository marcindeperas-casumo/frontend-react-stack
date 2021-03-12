//this is an exception to regular game page notifications
//screen which has to be displayed in FULL screen mode

import React from "react";
import { BlueRibbonChristmasCampaignAnimationContainer } from "Components/PromotionalGameLists/BlueRibbonChristmas/BlueRibbonChristmasCampaignNotifications";

export const FullScreenGamePageNotifications = () => {
  return (
    <div className="u-width--full u-height--full u-position--absolute">
      <BlueRibbonChristmasCampaignAnimationContainer />
    </div>
  );
};
