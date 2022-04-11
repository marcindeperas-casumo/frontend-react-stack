import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { useScreenOrientation } from "Utils/hooks";
import {
  useGameJackpotContext,
  useGameModelContext,
} from "Components/GamePage/Contexts";
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
  const { slug } = useGameModelContext();
  const { isLandscapeOriented } = useScreenOrientation();
  if (!composedJackpot) {
    return null;
  }

  return (
    <>
      <Mobile>
        <Flex
          direction={isLandscapeOriented() ? "horizontal" : "vertical"}
          className="bg-grey-70"
          spacing="none"
          justify="center"
          align="center"
        >
          <Flex.Item className="c-br-footer-widget__container-responsive-width">
            <BlueRibbonJackpotsFooterWidget
              normalizedPots={normalizePots(composedJackpot.pots)}
            />
          </Flex.Item>
          <Flex.Item className="c-br-footer-widget__container-responsive-width">
            <BlueRibbonManualOptInAndOptOut
              jackpotSlug={composedJackpot.slug}
              gameSlug={slug}
            />
          </Flex.Item>
        </Flex>
      </Mobile>
      <TabletAndDesktop>
        <Flex direction="horizontal" align="center" justify="center">
          <Flex
            direction="horizontal"
            align="center"
            justify="center"
            className="bg-grey-70 t-border-r-top-right--md t-border-r-top-left--md"
          >
            <BlueRibbonJackpotsFooterWidgetDesktop
              normalizedPots={normalizePots(composedJackpot.pots)}
            />
            <BlueRibbonManualOptInAndOptOut
              jackpotSlug={composedJackpot.slug}
              gameSlug={slug}
            />
          </Flex>
        </Flex>
      </TabletAndDesktop>
    </>
  );
}
