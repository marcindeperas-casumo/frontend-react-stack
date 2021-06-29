import * as React from "react";
import { BlueRibbonJackpotsFooterWidget } from "./BlueRibbonJackpotsFooterWidget";
import { useComposedJackpotConfigData } from "./useBlueRibbonSDK";

export function BlueRibbonJackpotsFooterWidgetContainer() {
  const { composedJackpot } = useComposedJackpotConfigData({
    jackpotSlug: "slug",
  });

  if (composedJackpot.pots.length < 3) {
    return null;
  }

  return (
    <BlueRibbonJackpotsFooterWidget normalizedPots={composedJackpot.pots} />
  );
}
