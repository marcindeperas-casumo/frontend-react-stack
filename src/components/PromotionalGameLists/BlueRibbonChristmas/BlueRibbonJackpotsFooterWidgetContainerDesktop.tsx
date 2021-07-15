import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { useGameJackpotContext } from "Components/GamePage/Contexts";
import { BlueRibbonJackpotsFooterWidgetDesktop } from "./BlueRibbonJackpotsFooterWidgetDesktop";
import { BlueRibbonManualOptInAndOptOut } from "./BlueRibbonManualOptInAndOptOut";
import { normalizePots } from "./utils";

export function BlueRibbonJackpotsFooterWidgetContainerDesktop() {
  const {
    blueribbonJackpotForCurrentGame: composedJackpot,
  } = useGameJackpotContext();

  if (!composedJackpot) {
    return null;
  }

  return (
    <React.Fragment>
      <Flex direction="horizontal" align="center" justify="center">
        <BlueRibbonJackpotsFooterWidgetDesktop
          normalizedPots={normalizePots(composedJackpot.pots)}
        />
        <BlueRibbonManualOptInAndOptOut jackpotSlug={composedJackpot.slug} />
      </Flex>
    </React.Fragment>
  );
}
