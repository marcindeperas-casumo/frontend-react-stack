// @flow
import * as React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import { CrossIcon } from "@casumo/cmp-icons";
import Text from "@casumo/cmp-text";
import LiveIcon from "./live-icon.svg";
import "./SportsNavTab.scss";

type BadgeProps = {
  className: string,
  children: React.Node,
};

const Badge = ({ className, children }: BadgeProps) => (
  <Flex
    align="center"
    justify="center"
    direction="vertical"
    className={classNames(
      "c-sports-nav-live-tab__badge t-border-r--circle u-font-weight-bold u-position-absolute",
      className
    )}
    spacing="none"
  >
    <Flex.Item>{children}</Flex.Item>
  </Flex>
);

const CountBadge = ({ count }: { count: number }) => (
  <Badge className="t-background-grey-dark-1 t-color-white">{count}</Badge>
);

const CloseBadge = () => (
  <Badge className="t-background-red-dark-1 t-color-white">
    <CrossIcon size="sm" />
  </Badge>
);

type LiveIconColoredProps = {
  isActive?: boolean,
};

const LiveIconColored = ({ isActive }: LiveIconColoredProps) => (
  <div className="o-ratio c-sports-icon u-margin-x">
    {isActive ? <CloseBadge /> : <CountBadge count={11} />}
    <Flex justify="center" align="center" className="o-ratio__content">
      <LiveIcon
        className={`t-border-r--circle t-color-${
          isActive ? "red" : "grey-dark-1"
        } u-drop-shadow`}
      />
    </Flex>
  </div>
);

type Props = LiveIconColoredProps & {
  label: React.Node,
  onClick: () => void,
  isActive?: boolean,
};

export const SportsNavLiveTab = ({ isActive, label, onClick }: Props) => (
  <div
    className={classNames(
      "c-sports-nav-live-tab u-padding-x u-padding-top--md u-padding-bottom--lg u-cursor-pointer o-flex",
      isActive && "c-sports-live-tab--selected t-background-red t-color-white"
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
      <LiveIconColored isActive={isActive} />
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
