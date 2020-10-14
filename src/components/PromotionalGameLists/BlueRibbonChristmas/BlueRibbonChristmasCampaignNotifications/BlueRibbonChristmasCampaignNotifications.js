// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonSecondary } from "@casumo/cmp-button";
import { useTranslations } from "Utils/hooks";
import { useJackpotsSubscription } from "../useJackpotsSubscription";
import {
  colors,
  jackpotWidgetContentPage,
  type JackpotWidgetContentPage,
} from "../blueRibbonConsts";
import WinBackground from "./win.svg";

const positionCenter = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

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
    <div
      className="u-position-absolute u-width--screen u-height--screen"
      style={{
        top: -64,
        left: -16,
        backgroundColor: colors.jackpotWinBackground,
      }}
    >
      <WinBackground style={positionCenter} />
      <Flex
        direction="vertical"
        align="center"
        justify="center"
        style={{ ...positionCenter, width: 343 }}
      >
        <Text
          tag="span"
          size="md"
          className="t-color-yellow-30 u-font-weight-black u-text-align-center u-width--full"
          style={{
            boxShadow: "0px 4px 4px 0px #000000 51%",
          }}
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
    <Flex justify="center" style={{ height: 98 }}>
      <Text
        tag="span"
        size="3xlg"
        className="t-color-yellow-30 u-font-weight-black u-text-align-center u-position-absolute"
        style={{
          paintOrder: "stroke fill",
          WebkitTextStroke: `4px ${colors.jackpotWinAmountBorder}`,
        }}
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
