// @flow
import * as React from "react";
import classNames from "classnames";
import { Link, useMatch } from "@reach/router";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { HeartIcon, PlayIcon, SearchIcon } from "@casumo/cmp-icons";

const NavLinkDesktop = ({
  Icon,
  text,
  to,
  active,
}: {
  Icon: React.StatelessFunctionalComponent<any>,
  text: string,
  to: string,
  active?: boolean,
}) => (
  <Flex.Item>
    <Link to={to}>
      <Flex
        direction="vertical"
        align="center"
        justify="center"
        className={classNames("u-padding--sm", {
          "t-color-chrome-dark-3": active,
          "t-color-chrome-dark-2": !active,
        })}
      >
        <Icon size="md" />
        <Text className="u-font-weight-bold">{text}</Text>
      </Flex>
      <Flex
        style={{ height: 3 }}
        className={classNames("t-border-r", {
          "t-background-plum": active,
        })}
      />
    </Link>
  </Flex.Item>
);
export const TopNavDesktop = () => {
  const match = useMatch("search");
  const searchActive = Boolean(match);

  return (
    <Flex
      className="o-wrapper u-padding-top--xlg"
      align="center"
      justify="center"
    >
      <Flex spacing="lg" className="u-padding-y">
        <NavLinkDesktop
          Icon={PlayIcon}
          text="Casino"
          to="."
          active={!searchActive}
        />
        <NavLinkDesktop
          Icon={SearchIcon}
          text="Search"
          to="search"
          active={searchActive}
        />
      </Flex>
    </Flex>
  );
};

const NavLinkMobile = ({
  Icon,
  text,
  to,
}: {
  Icon: React.StatelessFunctionalComponent<any>,
  text: string,
  to: string,
}) => {
  const match = useMatch(to);
  const active = Boolean(match);

  return (
    <Flex.Item>
      <Link
        to={to}
        style={{
          /* kill styles from knockout side */
          borderBottom: "none",
          padding: 0,
        }}
      >
        <Flex
          direction="vertical"
          align="center"
          justify="center"
          className={classNames("u-padding", {
            "t-color-chrome-dark-3": active,
            "t-color-chrome-dark-2": !active,
          })}
        >
          <Icon className="u-padding-y" />
          <Text size="xs" className="u-font-weight-bold">
            {text}
          </Text>
        </Flex>
        <Flex
          style={{ height: 3 }}
          className={classNames("t-border-r", {
            "t-background-plum": active,
          })}
        />
      </Link>
    </Flex.Item>
  );
};
export const TopNavMobile = () => (
  <Flex spacing="sm">
    <NavLinkMobile Icon={HeartIcon} text="Top lists" to="top" />
    <NavLinkMobile Icon={SearchIcon} text="Search" to="search" />
  </Flex>
);
