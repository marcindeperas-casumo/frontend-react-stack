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
    <Flex direction="horizontal" align="center" justify="center">
      <Flex
        direction="horizontal"
        align="center"
        justify="center"
        className="bg-grey-70 t-border-r-top-right--md"
      >
        <BlueRibbonJackpotsFooterWidgetDesktop
          normalizedPots={normalizePots(composedJackpot.pots)}
        />
        <BlueRibbonManualOptInAndOptOut
          jackpotSlug={composedJackpot.slug}
          isDesktop
        />
      </Flex>
    </Flex>
  );
}
