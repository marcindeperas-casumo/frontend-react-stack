// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { SpinIcon } from "@casumo/cmp-icons";
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
      className="c-reel-races-drawer u-position-fixed u-inset-x u-margin--auto t-background-grey-90 t-color-white u-padding t-background-grey-90 t-border-r u-width--2/3 o-flex--wrap"
      direction="horizontal"
      spacing="md"
    >
      <Flex
        direction="horizontal"
        justify="space-between"
        className="u-width--full"
      >
        <Flex.Item className="c-checkered-flag"></Flex.Item>
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
            <Flex.Item className="u-font-2xs">
              {gameDurationFormatted}
            </Flex.Item>
          </Flex>
        </Flex>
        <Flex.Item className="c-checkered-flag u-margin-left--none"></Flex.Item>
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
        <Flex.Item className="c-rr-position u-position-relative o-inset--auto t-border-r--circle t-background-grey-70 u-width--4xlg u-height--4xlg o-flex-align--center o-flex-justify--center">
          <span className="u-font-lg u-text-align-center">{position}</span>
          <span className="u-font-2xs u-text-align-right">{ordinalSuffix}</span>
        </Flex.Item>
        <Flex.Item className="u-padding-top--lg">
          <span className="u-font-md">{points}</span>
          <span className="u-font-xs">{t?.reel_races_drawer_pts}</span>
        </Flex.Item>
      </Flex>
    </Flex>
  );
};
