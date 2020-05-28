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

export function TopNavigation({ t, action }: Props) {
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
        spacing="lg"
        align="center"
        justify="center"
        className="u-padding-y--2xlg"
      >
        {items.map(({ routeId, isActive = false, ...item }) => (
          <Flex.Item key={routeId}>
            <Flex
              direction="vertical"
              align="center"
              className="u-cursor-pointer"
              onClick={() => action({ routeId })}
            >
              {item.icon}
              <Text className="u-margin-top--md u-margin-bottom u-font-weight-bold">
                {item.label}
              </Text>
              <div
                className={classNames("t-border-r u-width--full u-height--sm", {
                  "t-background-plum": isActive,
                })}
              />
            </Flex>
          </Flex.Item>
        ))}
      </Flex>
    </TabletAndDesktop>
  );
}
