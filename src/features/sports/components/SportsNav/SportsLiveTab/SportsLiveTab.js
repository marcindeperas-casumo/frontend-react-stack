// @flow
import * as React from "react";
import classNames from "classnames";
import Badge from "@casumo/cmp-badge";
import Flex from "@casumo/cmp-flex";
import { CrossIcon } from "@casumo/cmp-icons";
import Text from "@casumo/cmp-text";
import LiveIconActive from "./icons/live-icon-active.svg";
import LiveIconInactive from "./icons/live-icon-inactive.svg";

import "./SportsLiveTab.scss";

type Props = {
  isActive?: boolean,
};

const LiveIconCountBadge = ({ count = 11 }: { count: number }) => (
  <div className="t-background-grey-dark-3 t-border-r--circle u-font-weight-bold">
    {count}
  </div>
);

const LiveIconCloseBadge = () => (
  <Badge className="t-background-red-dark-1">
    <CrossIcon />
  </Badge>
);

const LiveIcon = ({ isActive }: Props) => (
  <div className="o-ratio c-sports-icon">
    {isActive && (
      <div className="o-ratio__content t-background-red" width={16} />
    )}
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

export const SportsLiveTab = ({
  isActive,
  label,
  onClick,
}: SportsLiveTabProps) => (
  <div
    className={classNames(
      "c-sports-live-tab u-padding-x u-padding-top--md u-padding-bottom--lg u-cursor-pointer o-flex",
      isActive && "c-sports-live-tab--active"
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
