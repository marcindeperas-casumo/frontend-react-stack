import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { useGameJackpotContext } from "Components/GamePage/Contexts";
import { useBlueRibbonAutoOptIn } from "Components/PromotionalGameLists/BlueRibbonChristmas/useBlueRibbonSDK";
import { Mobile, TabletAndDesktop } from "Components/ResponsiveLayout";
import { BlueRibbonJackpotsFooterWidgetDesktop } from "./BlueRibbonJackpotsFooterWidgetDesktop";
import { BlueRibbonJackpotsFooterWidget } from "./BlueRibbonJackpotsFooterWidget";
import { BlueRibbonManualOptInAndOptOut } from "./BlueRibbonManualOptInAndOptOut";
import { normalizePots } from "./utils";

export function BlueRibbonJackpotsFooterWidgetContainer() {
  useBlueRibbonAutoOptIn();
  const {
    blueribbonJackpotForCurrentGame: composedJackpot,
  } = useGameJackpotContext();

  if (!composedJackpot) {
    return null;
  }

  return (
    <>
      <Mobile>
        <BlueRibbonJackpotsFooterWidget
          normalizedPots={normalizePots(composedJackpot.pots)}
        />
        <BlueRibbonManualOptInAndOptOut jackpotSlug={composedJackpot.slug} />
      </Mobile>
      <TabletAndDesktop>
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
      </TabletAndDesktop>
    </>
  );
}
