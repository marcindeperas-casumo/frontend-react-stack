// @flow
import * as React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import { CrossIcon } from "@casumo/cmp-icons";
import Text from "@casumo/cmp-text";
import LiveIconActive from "./icons/live-icon-active.svg";
import LiveIconInactive from "./icons/live-icon-inactive.svg";
import "./SportsNavTab.scss";

type Props = {
  isActive?: boolean,
};

const LiveIconCountBadge = ({ count }: { count: number }) => (
  <Flex
    align="center"
    justify="center"
    direction="vertical"
    className="c-sports-live-tab__badge t-background-grey-dark-1 t-color-white t-border-r--circle u-font-weight-bold"
    spacing="none"
  >
    <Flex.Item>{count}</Flex.Item>
  </Flex>
);

const LiveIconCloseBadge = () => (
  <Flex
    align="center"
    justify="center"
    direction="vertical"
    className="c-sports-live-tab__badge t-background-red-dark-1 t-color-white t-border-r--circle u-font-weight-bold"
    spacing="none"
  >
    <CrossIcon size="sm" />
  </Flex>
);

const LiveIcon = ({ isActive }: Props) => (
  <div className="o-ratio c-sports-icon u-margin-x">
    {isActive ? <LiveIconCloseBadge /> : <LiveIconCountBadge count={11} />}
    <Flex justify="center" align="center" className="o-ratio__content">
      {isActive ? (
        <LiveIconActive className="t-border-r--circle u-drop-shadow" />
      ) : (
        <LiveIconInactive className="t-border-r--circle u-drop-shadow" />
      )}
    </Flex>
  </div>
);

type SportsLiveTabProps = Props & {
  label: React.Node,
  onClick: () => void,
  isActive?: boolean,
};

export const SportsNavLiveTab = ({
  isActive,
  label,
  onClick,
}: SportsLiveTabProps) => (
  <div
    className={classNames(
      "c-sports-live-tab u-padding-x u-padding-top--md u-padding-bottom--lg u-cursor-pointer o-flex",
      isActive && "t-background-red t-color-white"
    )}
    onClick={onClick}
  >
    <Flex
      align="center"
      justify="center"
      direction="vertical"
      className="o-flex--1"
      spacing="none"
    >
      <LiveIcon isActive={isActive} />
      <Text
        tag="span"
        size="sm"
        className={`u-font-weight-black u-text-align-center t-color-${
          isActive ? "white" : "grey-dark-1"
        } u-text-nowrap`}
      >
        {label}
      </Text>
    </Flex>
  </div>
);
