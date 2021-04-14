import Flex from "@casumo/cmp-flex";
import ReactDOMServer from "react-dom/server";
import * as React from "react";
import { BlueRibbonChristmasCampaignNotificationsContainer } from "Components/PromotionalGameLists/BlueRibbonChristmas/BlueRibbonChristmasCampaignNotifications";
import { RealMoneyPlayRequiredNotification } from "./ReusableNotification/RealMoneyPlayRequiredNotification";
import { ReelRaceStartingNotification } from "./ReelRaceStartingNotification";

import "./GamePageNotifications.scss";

export function GamePageNotifications() {
  if (
    /* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; }' is not assignable to type... Remove this comment to see the full error message */
    !ReactDOMServer.renderToStaticMarkup(ReelRaceStartingNotification) &&
    /* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; }' is not assignable to type... Remove this comment to see the full error message */
    !ReactDOMServer.renderToStaticMarkup(RealMoneyPlayRequiredNotification) &&
    !ReactDOMServer.renderToStaticMarkup(
      /* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; }' is not assignable to type... Remove this comment to see the full error message */
      BlueRibbonChristmasCampaignNotificationsContainer
    )
  ) {
    return null;
  }

  return (
    <Flex
      direction="vertical"
      align="stretch"
      className="c-game-page-notifications o-position--absolute o-inset-x--none u-margin--md u-width--1/2@desktop"
    >
      <Flex.Item>
        <ReelRaceStartingNotification />
      </Flex.Item>
      <Flex.Item>
        <BlueRibbonChristmasCampaignNotificationsContainer />
      </Flex.Item>
      <Flex.Item>
        <RealMoneyPlayRequiredNotification />
      </Flex.Item>
    </Flex>
  );
}
