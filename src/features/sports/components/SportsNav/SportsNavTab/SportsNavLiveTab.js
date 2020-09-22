// @flow
import * as React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import { CloseIcon } from "@casumo/cmp-icons";
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

const CloseBadge = () => (
  <Badge className="t-background-red-40 t-color-white">
    <CloseIcon size="sm" className="u-display--block" />
  </Badge>
);

type LiveIconColoredProps = {
  count: number,
  isActive?: boolean,
};

const LiveIconColored = ({ isActive }: LiveIconColoredProps) => (
  <div className="o-ratio c-sports-icon">
    {isActive && <CloseBadge />}
    <Flex justify="center" align="center" className="o-ratio__content">
      <LiveIcon className="t-color-red-30" />
    </Flex>
  </div>
);

type Props = LiveIconColoredProps & {
  count: number,
  label: React.Node,
  onClick: () => void,
  isActive?: boolean,
};

export const SportsNavLiveTab = ({
  count,
  isActive,
  label,
  onClick,
}: Props) => (
  <Flex direction="horizontal" className="u-margin-right">
    <div
      className={classNames(
        "c-sports-nav-live-tab u-margin-x u-cursor-pointer o-flex t-color-red-30",
        isActive &&
          "c-sports-live-tab--selected t-color-white t-background-red-30"
      )}
      onClick={onClick}
    >
      <Flex
        align="center"
        justify="center"
        direction="horizontal"
        className="o-flex--1 u-margin-y c-sports-nav-live-tab__wrapper u-margin-right"
        spacing="none"
      >
        <LiveIconColored count={count} isActive={isActive} />
        <Text
          tag="span"
          size="sm"
          className="u-font-weight-black u-text-align-center u-text-nowrap"
        >
          {label}
        </Text>
      </Flex>
    </div>
    <div className="t-background-grey-5 c-sports-nav-spacer" />
  </Flex>
);
