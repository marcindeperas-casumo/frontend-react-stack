import * as React from "react";
import { useGameJackpotContext } from "Components/GamePage/Contexts";
import { BlueRibbonJackpotsFooterWidget } from "./BlueRibbonJackpotsFooterWidget";
import { BlueRibbonManualOptInAndOptOut } from "./BlueRibbonManualOptInAndOptOut";
import { normalizePots } from "./utils";

export function BlueRibbonJackpotsFooterWidgetContainer() {
  const {
    blueribbonJackpotForCurrentGame: composedJackpot,
  } = useGameJackpotContext();

  if (!composedJackpot) {
    return null;
  }

  return (
    <React.Fragment>
      <BlueRibbonJackpotsFooterWidget
        normalizedPots={normalizePots(composedJackpot.pots)}
      />
      <BlueRibbonManualOptInAndOptOut jackpotSlug={composedJackpot.slug} />
    </React.Fragment>
  );
}
