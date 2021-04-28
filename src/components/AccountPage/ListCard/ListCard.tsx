import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ChevronRightIcon } from "@casumo/cmp-icons";
import type { iconSizes } from "@casumo/cudl-react-prop-types";
import * as React from "react";
import { Link } from "@reach/router";
import { MobileAndTablet, Desktop } from "Components/ResponsiveLayout";
import { Panel } from "Components/Panel";

type TProps = {
  Icon: React.ComponentType<{ size: iconSizes }>;
  title: string;
  action: {
    label: string;
    url: string;
  };
  children: React.ReactChild;
  panelProps?: Omit<React.ComponentProps<typeof Panel>, "children">;
};

export function ListCard({
  Icon,
  children,
  title,
  action,
  panelProps,
}: TProps) {
  return (
    <Panel {...panelProps}>
      <MobileAndTablet>
        <Link to={action.url} className="text-grey-90">
          <Flex
            direction="horizontal"
            justify="space-between"
            align="center"
            spacing="md"
          >
            <Flex.Item>
              <Icon size="md" />
            </Flex.Item>
            <Flex.Block>
              <Flex direction="vertical">
                <Text tag="h3" className="u-font-weight-bold">
                  {title}
                </Text>
                {children}
              </Flex>
            </Flex.Block>
            <Flex.Item>
              <ChevronRightIcon size="md" />
            </Flex.Item>
          </Flex>
        </Link>
      </MobileAndTablet>
      <Desktop>
        <Flex direction="horizontal" justify="space-between">
          <Text className="u-font-weight-bold">{title}</Text>
          <Link className="u-font-weight-bold text-purple-60" to={action.url}>
            {action.label}
          </Link>
        </Flex>
        {children}
      </Desktop>
    </Panel>
  );
}
