import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { SpinIcon, ChevronDownIcon, ChevronUpIcon } from "@casumo/cmp-icons";
import cx from "classnames";
import * as React from "react";
import { CheckeredFlagIcon } from "Components/CheckeredFlagIcon/CheckeredFlagIcon";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";
import { getProgressColor } from "Models/reelRaces/reelRaces.utils";
import { useGameActivityAwareWidgetLeaderboard } from "Models/reelRaces";
import { useReelRaceProgress } from "Utils/hooks/useReelRaceProgress";
import { MARKETS } from "Src/constants";
import { useTranslations, useMarket } from "Utils/hooks";
import { CMS_SLUGS } from "Models/playing";
import { ReelRaceBoosters } from "Components/ReelRaceBoosters";
import { PositionView } from "./PositionView";
import ReelRaceLogoRow from "./images/rrLogo.svg";
import ReelRaceLogoEs from "./images/rrLogo-es.svg";

import "./ReelRacesDrawerWidget.scss";

type TProps = {
  className?: string;
  currentRace: any;
  onShowLeaderboardClick?: () => void;
  showLeaderboardLink?: boolean;
  isLeaderboardOpen?: boolean;
};

type TLogoProps = {
  className?: string;
};

function ReelRacesLogo({ className }: React.PropsWithChildren<TLogoProps>) {
  const market = useMarket();

  return market === MARKETS.es_es ? (
    <ReelRaceLogoEs className={className} />
  ) : (
    <ReelRaceLogoRow className={className} />
  );
}

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
}: TProps) => {
  const t = useTranslations<{
    reel_races_drawer_pts: string;
    reel_races_drawer_points: string;
    reel_races_drawer_spins: string;
    reel_races_drawer_full_leaderboard: string;
  }>(CMS_SLUGS.MODAL_WAGERING);
  const userLeaderboard = useGameActivityAwareWidgetLeaderboard();

  const raceLogo = (
    <Desktop>
      <div className="u-padding-bottom--xlg u-padding-top--lg">
        <ReelRacesLogo className="u-width--1/3 u-margin-x--auto u-display--block" />
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
      <Flex.Item className="c-reel-races-drawer-widget__elem c-reel-races-drawer-widget-position o-position--relative">
        <PositionView
          // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
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

      {/* <MobileAndTablet>
        <div
          className="u-width--full u-text-align-center u-cursor--pointer"
          onClick={onShowLeaderboardClick}
        >
          show leaderboard!
        </div>
      </MobileAndTablet> */}

      {leaderboard}
    </Flex>
  );
};

const RaceProgress = ({ currentRace }) => {
  const gameProgress = useReelRaceProgress(currentRace, 1000);
  const gameDuration =
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
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
