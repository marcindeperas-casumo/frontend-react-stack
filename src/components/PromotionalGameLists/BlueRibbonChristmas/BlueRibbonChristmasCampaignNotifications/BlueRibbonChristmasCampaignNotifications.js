// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { CloseIcon } from "@casumo/cmp-icons";
import { useTranslations } from "Utils/hooks";
import DangerousHtml from "Components/DangerousHtml";
import { interpolate } from "Utils";
import { type PauseResumeProps } from "Components/Compliance/PlayOkayBar/PlayOkayBarContainer";
import { useBlueRibbonAutoOptIn } from "../useBlueRibbonSDK";
import { useJackpotsSubscription } from "../useJackpotsSubscription";
import {
  jackpotWidgetContentPage,
  type JackpotWidgetContentPage,
} from "../blueRibbonConsts";
import "./blueRibbonChristmasCampaignNotifications.scss";

export function BlueRibbonChristmasCampaignNotifications({
  pauseGame,
  resumeGame,
}: PauseResumeProps) {
  const t = useTranslations<JackpotWidgetContentPage>(jackpotWidgetContentPage);
  const { jackpotAmount, acknowledge, type } = useJackpotsSubscription({
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
