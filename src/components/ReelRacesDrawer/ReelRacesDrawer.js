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
  spinsLeft: string,
  ordinalSuffix: string,
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
    )} u-line-height--1 u-position-relative u-margin-top--lg`}
  >
    <LaurelIcon size="sm" className="c-reel-races-drawer__laurel" />
    <Text
      className={cx(
        "u-font-weight-bold c-reel-races-drawer__laurel-position u-position-absolute"
      )}
      tag="div"
      size={position > 99 ? "sm" : "md"}
    >
      {position}
    </Text>
  </div>
);

export const ReelRacesDrawer = ({
  spinsLeft,
  ordinalSuffix,
  position,
  points,
  gameProgress,
  gameDuration,
  t,
}: Props) => {
  const gameDurationFormatted = `${gameDuration}:00`;
  return (
    <Flex
      className="c-reel-races-drawer u-margin-bottom--md u-inset-x u-margin--auto t-background-grey-90 t-color-white u-padding t-background-grey-90 t-border-r u-width--full o-flex--wrap"
      direction="horizontal"
      spacing="md"
    >
      <Flex
        direction="horizontal"
        justify="space-between"
        className="u-width--full"
      >
        <CheckeredFlagIcon />
        <Flex
          direction="vertical"
          className="o-flex--wrap u-width--full u-padding-left u-padding-right"
        >
          <Flex.Item className="c-progressBar t-background-grey-70 t-border-r u-height--sm">
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
        <CheckeredFlagIcon inactive />
      </Flex>
      <Flex
        direction="horizontal"
        justify="space-between"
        className="u-width--full c-rr-position-wrapper u-height--4xlg"
      >
        <Flex.Item className="u-padding-top--lg">
          <SpinIcon className="t-color-white u-padding-bottom--sm u-padding-right--sm" />
          <span className="u-font-md">{spinsLeft}</span>
        </Flex.Item>
        <Flex.Item className="u-position-relative o-inset--auto u-width--4xlg u-height--4xlg o-flex-align--center o-flex-justify--center">
          <PositionView position={parseInt(position, 10)} />
        </Flex.Item>
        <Flex.Item className="u-padding-top--lg">
          <span className="u-font-md">{points}</span>
          <span className="u-font-xs">{t?.reel_races_drawer_pts}</span>
        </Flex.Item>
      </Flex>
    </Flex>
  );
};
