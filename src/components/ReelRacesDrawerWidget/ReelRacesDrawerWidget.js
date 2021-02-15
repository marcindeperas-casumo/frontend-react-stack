// @flow
import * as React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { SpinIcon, ChevronDownIcon, ChevronUpIcon } from "@casumo/cmp-icons";
import { useSelector } from "react-redux";
import { CheckeredFlagIcon } from "Components/CheckeredFlagIcon/CheckeredFlagIcon";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";
import { getProgressColor } from "Models/reelRaces/reelRaces.utils";
import { useTranslations, useReelRaceProgress } from "Utils/hooks";
import { playerIdSelector } from "Models/handshake";
import { CMS_SLUGS } from "Models/playing";
import { ReelRaceBoosters } from "Components/ReelRaceBoosters";
import { PositionView } from "./PositionView";
import RRLogo from "./images/rrLogo.svg";

import "./ReelRacesDrawerWidget.scss";

type Props = {
  className?: string,
  currentRace: any,
  onShowLeaderboardClick?: () => void,
  showLeaderboardLink?: boolean,
  isLeaderboardOpen?: boolean,
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

export const ReelRacesDrawerWidget = ({
  className,
  currentRace,
  onShowLeaderboardClick = () => {},
  showLeaderboardLink = false,
  isLeaderboardOpen = false,
}: Props) => {
  const t = useTranslations<{
    reel_races_drawer_pts: string,
    reel_races_drawer_points: string,
    reel_races_drawer_spins: string,
    reel_races_drawer_full_leaderboard: string,
  }>(CMS_SLUGS.MODAL_WAGERING);
  const playerId = useSelector(playerIdSelector);
  const userLeaderboard = useSelector(
    x => x.reelRaces.leaderboard[playerId],
    (left, right) => {
      if (
        ["remainingSpins", "points", "position"].some(x => left[x] !== right[x])
      ) {
        return false;
      }

      return !["winsInARow", "bigWins", "megaWins"].some(
        x => left.boosters[x] !== right.boosters[x]
      );
    }
  );

  const raceLogo = (
    <Desktop>
      <div className="u-padding-bottom--xlg u-padding-top--lg">
        <RRLogo className="u-width--1/3 u-margin-x--auto u-display--block" />
      </div>
    </Desktop>
  );

  const raceStatus = (
    <Flex
      direction="horizontal"
      justify="space-between"
      className="u-width--full u-padding-top--md u-padding-top--lg@desktop"
      spacing="none"
    >
      <Flex.Block className="c-reel-races-drawer-widget__elem u-text-align-center">
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
              {userLeaderboard.remainingSpins}
            </Text>
          </>
        </StatusElement>
      </Flex.Block>
      <Flex.Item className="c-reel-races-drawer-widget__elem c-reel-races-drawer-widget-position u-position-relative">
        <PositionView
          position={parseInt(userLeaderboard.position, 10)}
          className="u-margin-top--lg@desktop"
        />
      </Flex.Item>
      <Flex.Block className="c-reel-races-drawer-widget__elem u-text-align-center">
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
              {userLeaderboard.points}
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

  const leaderboard = showLeaderboardLink ? (
    <Desktop>
      <div
        className="u-width--full u-text-align-center u-cursor--pointer u-padding-top"
        onClick={onShowLeaderboardClick}
      >
        <Text
          tag="span"
          size="2xs"
          className="t-color-white u-text-transform-uppercase u-font-weight-black"
        >
          {t?.reel_races_drawer_full_leaderboard}
        </Text>
        {isLeaderboardOpen ? (
          <ChevronUpIcon size="sm" />
        ) : (
          <ChevronDownIcon size="sm" />
        )}
      </div>
    </Desktop>
  ) : null;
  return (
    <Flex
      className={cx(
        "c-reel-races-drawer-widget t-color-white u-padding u-padding--md@desktop u-padding-top--none@desktop t-color-white t-border-r o-flex--wrap u-margin-bottom--none@desktop",
        className
      )}
      direction="horizontal"
      spacing="md"
    >
      {raceLogo}
      <RaceProgress currentRace={currentRace} />
      {raceStatus}
      <ReelRaceBoosters
        className="u-width--full u-margin-top--2xlg u-margin-top--none@desktop"
        winsInARow={userLeaderboard.boosters.winsInARow}
        bigWins={userLeaderboard.boosters.bigWins}
        megaWins={userLeaderboard.boosters.megaWins}
      />
      {leaderboard}
    </Flex>
  );
};

const RaceProgress = ({ currentRace }) => {
  const gameProgress = useReelRaceProgress(currentRace, 1000);
  const gameDuration =
    parseInt((currentRace.endTime - currentRace.startTime) / 1000 / 60, 10) ||
    0;
  const gameDurationFormatted = `${gameDuration}:00`;
  const gameDurationInS = gameDuration * 60;
  const elapsedTime = (gameDurationInS * gameProgress) / 100;
  const elapsedMinutes = `${Math.floor(elapsedTime / 60)}`.padStart(2, "0");
  const elapsedSeconds = `${Math.floor(elapsedTime % 60)}`.padStart(2, "0");
  const timeElapsedFormatted = `${elapsedMinutes}:${elapsedSeconds}`;

  return (
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
};
