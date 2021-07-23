import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { CloseIcon } from "@casumo/cmp-icons";
import * as React from "react";
import { useTranslations } from "Utils/hooks";
import DangerousHtml from "Components/DangerousHtml";
import { useBlueRibbonAutoOptIn } from "../useBlueRibbonSDK";
import { jackpotWidgetContentPage } from "../blueRibbonConsts";
import type { JackpotWidgetContentPage } from "../blueRibbonConsts";
import "./blueRibbonChristmasCampaignNotifications.scss";

export function BlueRibbonChristmasCampaignNotifications() {
  const t = useTranslations<JackpotWidgetContentPage>(jackpotWidgetContentPage);
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
          className="u-padding--md bg-white t-border-r u-margin-bottom--md"
          align="center"
        >
          <Flex.Item className="o-position--relative">
            <img
              className="u-display--block t-border-r--circle"
              width={40}
              height={40}
              alt=""
              src={t.blizzard_campaign_image}
            />
          </Flex.Item>
          <Flex.Block>
            <Text size="sm" tag="span" className="text-black">
              <DangerousHtml html={t.blizzard_campaign_content} />
            </Text>
          </Flex.Block>
          <Flex.Item>
            <div
              onClick={() => setAcknowledged(true)}
              className="t-border-r--circle bg-grey-0 u-padding u-cursor--pointer"
            >
              <CloseIcon className="text-black" />
            </div>
          </Flex.Item>
        </Flex>
      )}
    </>
  );
}
