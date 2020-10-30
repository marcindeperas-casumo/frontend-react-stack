// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonSecondary } from "@casumo/cmp-button";
import { CloseIcon } from "@casumo/cmp-icons";
import DangerousHtml from "Components/DangerousHtml";
import { useTranslations } from "Utils/hooks";
import { interpolate } from "Utils";
import { type PauseResumeProps } from "Components/Compliance/PlayOkayBar/PlayOkayBarContainer";
import { useBlueRibbonAutoOptIn } from "../useBlueRibbonSDK";
import { useJackpotsSubscription } from "../useJackpotsSubscription";
import {
  jackpotWidgetContentPage,
  type JackpotWidgetContentPage,
} from "../blueRibbonConsts";
import WinBackground from "./win.svg";
import "./blueRibbonChristmasCampaignNotifications.scss";

export function BlueRibbonChristmasCampaignNotifications({
  pauseGame,
  resumeGame,
}: PauseResumeProps) {
  const t = useTranslations<JackpotWidgetContentPage>(jackpotWidgetContentPage);
  const {
    isFullScreen,
    jackpotAmount,
    acknowledge,
    type,
  } = useJackpotsSubscription({
    pauseGame,
    resumeGame,
  });
  const { isJackpotGame } = useBlueRibbonAutoOptIn();
  const [acknowledged, setAcknowledged] = React.useState(false);

  if (!t || !isJackpotGame) {
    return null;
  }

  return (
    <>
      {isFullScreen && jackpotAmount && type && (
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
      )}
      {!acknowledged && (
        <Flex
          direction="horizontal"
          className="u-padding--md t-background-white t-border-r u-margin-bottom--md"
          align="center"
        >
          <Flex.Item className="u-position-relative">
            <img
              className="u-display--block t-border-r--circle"
              width={40}
              height={40}
              alt=""
              src={t.blizzard_campaign_image}
            />
          </Flex.Item>
          <Flex.Block>
            <Text size="sm" tag="span" className="t-color-black">
              <DangerousHtml html={t.blizzard_campaign_content} />
            </Text>
          </Flex.Block>
          <Flex.Item>
            <div
              onClick={() => setAcknowledged(true)}
              className="t-border-r--circle t-background-grey-0 u-padding u-cursor--pointer"
            >
              <CloseIcon className="t-color-black" />
            </div>
          </Flex.Item>
        </Flex>
      )}
      {type === "community_jackpot_win" && jackpotAmount && (
        <Flex
          direction="horizontal"
          className="u-padding--md t-background-white t-border-r"
          align="center"
        >
          <Flex.Item className="u-position-relative">
            <img
              className="u-display--block t-border-r--circle"
              width={40}
              height={40}
              alt=""
              src={t.community_jackpot_win_icon}
            />
          </Flex.Item>
          <Flex.Block>
            <Text
              size="sm"
              tag="span"
              className="t-color-grey-50 u-padding-bottom--sm"
            >
              {t.community_jackpot_win}
            </Text>
            <br />
            <Text
              size="sm"
              tag="span"
              className="t-color-black u-font-weight-bold"
            >
              {interpolate(t.community_jackpot_win_amount, {
                amount: jackpotAmount,
              })}
            </Text>
          </Flex.Block>
          <Flex.Item>
            <div
              onClick={acknowledge}
              className="t-border-r--circle t-background-grey-0 u-padding u-cursor--pointer"
            >
              <CloseIcon className="t-color-black" />
            </div>
          </Flex.Item>
        </Flex>
      )}
    </>
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
