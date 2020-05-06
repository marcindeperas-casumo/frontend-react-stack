// @flow
import * as React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { CogIcon, BriefcaseIcon, PlayokayIcon } from "@casumo/cmp-icons";
import { TabletAndDesktop } from "Components/ResponsiveLayout";

type Props = {
  t: {
    yourStuffLabel: ?string,
    detailsLabel: ?string,
    playOkayLabel: ?string,
  },
  action: (params: { routeId: string, params?: Object }) => void,
};

export function DepositLimitsTopNavigation({ t, action }: Props) {
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
      <Flex align="center" justify="center" className="u-padding-y--2xlg">
        {items.map(({ routeId, ...item }) => (
          <Flex
            key={routeId}
            direction="vertical"
            align="center"
            // $FlowIgnore
            className={classNames("u-cursor-pointer", item?.className)}
            onClick={() => action({ routeId })}
          >
            {item.icon}
            <Text className="u-margin-top--md u-margin-bottom u-font-weight-bold">
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
