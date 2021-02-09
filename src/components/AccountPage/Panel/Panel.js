// @flow
import * as React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ChevronRightIcon } from "@casumo/cmp-icons";
import { Link } from "@reach/router";
import { MobileAndTablet, Desktop } from "Components/ResponsiveLayout";
import { type TGridArea } from "../AccountPage/AccountPage.types";

type Props = {
  Icon: React.ComponentType<{}>,
  title: string,
  seeAllLink: {
    label: string,
    url: string,
  },
  children: React.Node,
  className?: string,
  gridArea?: TGridArea,
  roundedTop?: boolean,
  roundedBottom?: boolean,
};

export function Panel({
  Icon,
  className,
  children,
  gridArea,
  title,
  seeAllLink,
  roundedTop,
  roundedBottom,
}: Props) {
  return (
    <div
      className={cx(
        "t-background-white u-padding-x--md u-padding-y--lg",
        className,
        {
          "t-border-r-top-left t-border-r-top-right": roundedTop,
          "t-border-r-bottom-left t-border-r-bottom-right": roundedBottom,
        }
      )}
      style={{ gridArea }}
    >
      <MobileAndTablet>
        <Link to={seeAllLink.url} className="t-color-grey-90">
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
          <Link
            className="u-font-weight-bold t-color-purple-60"
            to={seeAllLink.url}
          >
            {seeAllLink.label}
          </Link>
        </Flex>
        {children}
      </Desktop>
    </div>
  );
}
