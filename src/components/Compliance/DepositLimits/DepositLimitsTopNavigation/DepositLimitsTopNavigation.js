// @flow
import * as React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { CogIcon, BriefcaseIcon, PlayokayIcon } from "@casumo/cmp-icons";
import { navigateById } from "Services/NavigationService";
import { TabletAndDesktop } from "Components/ResponsiveLayout";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import "./styles.scss";

export function DepositLimitsTopNavigation() {
  const { t } = useTranslationsGql({
    yourStuffLabel:
      "root:shared.playokay.dgoj.deposit-limits:fields.top_navi_your_stuff_label",
    detailsLabel:
      "root:shared.playokay.dgoj.deposit-limits:fields.top_navi_details_label",
    playOkayLabel:
      "root:shared.playokay.dgoj.deposit-limits:fields.top_navi_playokay_label",
  });
  const items = [
    {
      icon: <BriefcaseIcon size="lg" />,
      label: t.yourStuffLabel,
      routeId: "player",
    },
    {
      icon: <CogIcon size="lg" />,
      label: t.detailsLabel,
      routeId: "settings",
      className: "u-margin-x--lg",
    },
    {
      icon: <PlayokayIcon size="lg" />,
      label: t.playOkayLabel,
      routeId: "play-okay-settings",
      isActive: true,
    },
  ];

  return (
    <TabletAndDesktop>
      <Flex
        align="center"
        justify="center"
        className="u-padding-top--lg u-font-weight-bold"
      >
        {items.map(({ routeId, ...item }) => (
          <Flex
            direction="vertical"
            align="center"
            // $FlowIgnore
            className={classNames("u-cursor-pointer", item?.className)}
            onClick={() => navigateById({ routeId })}
          >
            {item.icon}
            <Text className="u-margin-top--md u-margin-bottom">
              {item.label}
            </Text>
            <div
              className={classNames(
                "t-border-r u-width--full u-height--sm",
                item.isActive && "t-background-plum"
              )}
            />
          </Flex>
        ))}
      </Flex>
    </TabletAndDesktop>
  );
}
