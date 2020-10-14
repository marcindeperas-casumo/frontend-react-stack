// @flow
import * as React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { SpinIcon } from "@casumo/cmp-icons";
import { CheckeredFlagIcon } from "Components/CheckeredFlagIcon/CheckeredFlagIcon";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";
import { getProgressColor } from "Models/reelRaces/reelRaces.utils";
import { PositionView } from "./PositionView";
import RRLogo from "./images/rrLogo.svg";

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
    reel_races_drawer_points: ?string,
    reel_races_drawer_spins: ?string,
  },
};

const StatusElement = ({ children }) => (
  <Flex direction="vertical">
    {React.Children.map(children, (elem, i) =>
      i === 0 ? (
        <Desktop>
          <Flex.Item>{elem}</Flex.Item>
        </Desktop>
      ) : (
        <Flex.Item>{elem}</Flex.Item>
      )
    )}
  </Flex>
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
  const gameDurationInS = gameDuration * 60;
  const elapsedTime = (gameDurationInS * gameProgress) / 100;
  const elapsedMinutes = `${Math.floor(elapsedTime / 60)}`.padStart(2, "0");
  const elapsedSeconds = `${Math.floor(elapsedTime % 60)}`.padStart(2, "0");
  const timeElapsedFormatted = `${elapsedMinutes}:${elapsedSeconds}`;

  const raceLogo = (
    <Desktop>
      <div className="u-width--full u-padding-bottom--xlg u-padding-top--lg">
        <RRLogo className="u-margin-x--auto u-display--block" />
      </div>
    </Desktop>
  );
  const raceProgress = (
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
            className={`c-highlighted-progress-bar t-background-${getProgressColor(
              gameProgress
            )}`}
            style={{ width: `${gameProgress}%` }}
          ></div>
        </Flex.Item>
        <Flex
          direction="horizontal"
          className="u-width--full t-color-grey-20"
          justify="space-between"
        >
          <Flex.Item className="u-font-2xs">{timeElapsedFormatted}</Flex.Item>
          <Flex.Item className="u-font-2xs t-color-grey-50">
            {gameDurationFormatted}
          </Flex.Item>
        </Flex>
      </Flex>
      <Flex.Item>
        <CheckeredFlagIcon inactive />
      </Flex.Item>
    </Flex>
  );

  const raceStatus = (
    <Flex
      direction="horizontal"
      justify="space-between"
      className="u-width--full u-padding-top--md u-padding-top--lg@desktop"
      spacing="none"
    >
      <Flex.Block className="c-reel-races-drawer__elem u-text-align-center">
        <StatusElement>
          <Text
            size="xs"
            tag="span"
            className="t-color-grey-50 u-text-transform-uppercase"
          >
            {t?.reel_races_drawer_spins}
          </Text>
          <>
            <MobileAndTablet>
              <SpinIcon
                className="t-color-grey-20 u-padding-bottom--sm u-padding-right--sm"
                size="sm"
              />
            </MobileAndTablet>
            <Text tag="span" size="md" className="t-color-white">
              {spinsLeft}
            </Text>
          </>
        </StatusElement>
      </Flex.Block>
      <Flex.Item className="c-reel-races-drawer__elem c-reel-races-drawer-position u-position-relative">
        <PositionView
          position={parseInt(position, 10)}
          className="u-margin-top--lg@desktop"
        />
      </Flex.Item>
      <Flex.Block className="c-reel-races-drawer__elem u-text-align-center">
        <StatusElement>
          <Text
            size="xs"
            tag="span"
            className="t-color-grey-50 u-text-transform-uppercase"
          >
            {t?.reel_races_drawer_points}
          </Text>
          <>
            <Text tag="span" size="md">
              {points}
            </Text>
            <MobileAndTablet>
              <Text
                tag="span"
                size="xs"
                className="t-color-grey-20 u-margin-left--sm"
              >
                {t?.reel_races_drawer_pts}
              </Text>
            </MobileAndTablet>
          </>
        </StatusElement>
      </Flex.Block>
    </Flex>
  );
  return (
    <Flex
      className={cx(
        "c-reel-races-drawer t-color-white u-padding t-border-r t-border-r--none@desktop o-flex--wrap u-margin-bottom--md u-margin-bottom--none@desktop",
        className
      )}
      direction="horizontal"
      spacing="md"
    >
      {raceLogo}
      {raceProgress}
      {raceStatus}
    </Flex>
  );
};
