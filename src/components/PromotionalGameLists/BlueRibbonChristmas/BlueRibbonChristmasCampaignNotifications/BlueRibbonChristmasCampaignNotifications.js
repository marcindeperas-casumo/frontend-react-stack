// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonSecondary } from "@casumo/cmp-button";
import { useTranslations } from "Utils/hooks";
import { useJackpotsSubscription } from "../useJackpotsSubscription";
import {
  jackpotWidgetContentPage,
  type JackpotWidgetContentPage,
} from "../blueRibbonConsts";
import WinBackground from "./win.svg";
import "./blueRibbonChristmasCampaignNotifications.scss";

export function BlueRibbonChristmasCampaignNotifications() {
  const t = useTranslations<JackpotWidgetContentPage>(jackpotWidgetContentPage);
  const { jackpotAmount, acknowledge, type } = useJackpotsSubscription();
  if (!t || !jackpotAmount || !type) {
    return null;
  }

  if (type === "community_jackpot_win") {
    return null; // TCAS-522
  }

  return (
    <div className="u-position-absolute u-width--screen u-height--screen c-game-notification--reset-top-left">
      <WinBackground className="c-game-notification--absolute-center c-game-notification--win-background" />
      <Flex
        direction="vertical"
        align="center"
        justify="center"
        className="c-game-notification--absolute-center c-game-notification__win-info--size"
      >
        <Text
          tag="span"
          size="md"
          className="t-color-yellow-30 u-font-weight-black u-text-align-center u-width--full c-game-notification__win-info"
        >
          {t[type]}
        </Text>
        <JackpotAmount value={jackpotAmount} />
        <ButtonSecondary className="u-width--full" onClick={acknowledge}>
          {t.continue_playing}
        </ButtonSecondary>
      </Flex>
    </div>
  );
}

function JackpotAmount({ value }: { value: string }) {
  return (
    <Flex justify="center" className="c-game-notification__win-amount--size">
      <Text
        tag="span"
        size="3xlg"
        className="t-color-yellow-30 u-font-weight-black u-text-align-center u-position-absolute c-game-notification__win-amount--effect"
      >
        {value}
      </Text>
      <Text
        tag="span"
        size="3xlg"
        className="t-color-yellow-30 u-font-weight-black u-text-align-center u-position-absolute"
      >
        {value}
      </Text>
    </Flex>
  );
}
