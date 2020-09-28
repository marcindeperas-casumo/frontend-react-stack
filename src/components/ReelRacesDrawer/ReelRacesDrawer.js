// @flow
import * as React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { SpinIcon, LaurelIcon } from "@casumo/cmp-icons";
import { CheckeredFlagIcon } from "Components/CheckeredFlagIcon/CheckeredFlagIcon";
import { getLaurelColor } from "Models/reelRaces/reelRaces.utils";

import "./ReelRacesDrawer.scss";

type Props = {
  className?: string,
  spinsLeft: string,
  position: string,
  points: string,
  gameProgress: number,
  gameDuration: number,
  t?: {
    reel_races_drawer_pts: ?string,
  },
};

const PositionView = ({ position }) => (
  <div
    className={`t-color-${getLaurelColor(
      position
    )} u-line-height--1 u-position-relative u-text-align-center`}
  >
    <Text
      className={cx(
        "u-font-weight-bold c-reel-races-drawer__laurel-position u-width--4xlg"
      )}
      tag="div"
      size={position > 99 ? "sm" : "md"}
    >
      {position}
    </Text>
    <LaurelIcon
      size="sm"
      className="c-reel-races-drawer__laurel u-position-absolute"
    />
  </div>
);

export const ReelRacesDrawer = ({
  className,
  spinsLeft,
  position,
  points,
  gameProgress,
  gameDuration,
  t,
}: Props) => {
  const gameDurationFormatted = `${gameDuration}:00`;
  return (
    <Flex
      className={cx(
        "c-reel-races-drawer t-color-white u-padding t-border-r o-flex--wrap"
      )}
      direction="horizontal"
      spacing="md"
    >
      <Flex
        direction="horizontal"
        justify="space-between"
        className="u-width--full"
        spacing="none"
      >
        <Flex.Item>
          <CheckeredFlagIcon />
        </Flex.Item>
        <Flex
          direction="horizontal"
          className="o-flex--wrap u-width--full u-padding-left u-padding-right"
        >
          <Flex.Item className="c-progress-bar t-background-grey-70 t-opacity-background-100 t-border-r u-height--sm u-width--full">
            <div
              className="c-highlighted-progress-bar t-background-teal-50"
              style={{ width: `${gameProgress}%` }}
            ></div>
          </Flex.Item>
          <Flex
            direction="horizontal"
            className="u-width--full t-color-grey-20"
          >
            <Flex.Item className="u-font-2xs o-flex__block">00:00</Flex.Item>
            <Flex.Item className="u-font-2xs t-color-grey-50">
              {gameDurationFormatted}
            </Flex.Item>
          </Flex>
        </Flex>
        <Flex.Item>
          <CheckeredFlagIcon inactive />
        </Flex.Item>
      </Flex>
      <Flex
        direction="horizontal"
        justify="space-between"
        className="u-width--full u-padding-top--md"
        spacing="none"
      >
        <Flex.Block className="c-reel-races-drawer__elem u-text-align-center">
          <SpinIcon className="t-color-grey-20 u-padding-bottom--sm u-padding-right--sm" />
          <Text tag="span" size="md" className="t-color-white">
            {spinsLeft}
          </Text>
        </Flex.Block>
        <Flex.Item className="c-reel-races-drawer__elem u-position-relative ">
          <PositionView position={parseInt(position, 10)} />
        </Flex.Item>
        <Flex.Block className="c-reel-races-drawer__elem u-text-align-center">
          <Text tag="span" size="md">
            {points}
          </Text>
          <Text
            tag="span"
            size="xs"
            className="t-color-grey-20 u-margin-left--sm"
          >
            {t?.reel_races_drawer_pts}
          </Text>
        </Flex.Block>
      </Flex>
    </Flex>
  );
};
