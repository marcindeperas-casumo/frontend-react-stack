// @flow
import * as React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import { useSelector } from "react-redux";
import {
  useTranslationsGql,
  useCurrentReelRaceInfo,
  useReelRaceProgress,
} from "Utils/hooks";
import { playingSelector, CMS_SLUGS } from "Models/playing";
import { playerIdSelector } from "Models/handshake";
import { isNativeByUserAgent } from "Src/gameProviders/utils";
import { useReelRaceLeaderboardModal } from "Components/RSModal/Slots/ReelRaceLeaderboardModal/useReelRaceLeaderboardModal";
import { SidebarElementWrapper } from "Components/Sidebar/SidebarElementWrapper/SidebarElementWrapper";
import { Desktop, isDesktop } from "Components/ResponsiveLayout";
import { usePinnedWidgetsContext } from "Components/GamePage/Contexts";
import { DRAWERS } from "Components/Sidebar/SidebarElementWrapper/constants";
import { ReelRaceLeaderboardResults } from "Components/ReelRaceLeaderboard/ReelRaceLeaderboardResults";
import { ReelRacesDrawerWidget } from "./ReelRacesDrawerWidget";

type Props = {
  className?: string,
  initialShowLeaderboard?: boolean,
};

const LEADERBOARD_SPAN = 20;
const LEADERBOARD_FIXED = 3;
const LEADERBOARD_LAURELS = 3;
const TOTAL_LEADERBOARD_RESULTS = 10;

export const ReelRacesDrawerWidgetContainer = ({
  className,
  initialShowLeaderboard = false,
}: // eslint-disable-next-line sonarjs/cognitive-complexity
Props) => {
  const playing = useSelector(playingSelector);
  const playerId = useSelector(playerIdSelector);
  const currentReelRaceFromHook = useCurrentReelRaceInfo(playing?.gameId);
  const currentRace = isNativeByUserAgent() ? null : currentReelRaceFromHook;
  const [showLeaderboard, setShowLeaderboard] = React.useState(
    initialShowLeaderboard
  );
  const { togglePin, pinnedWidgets } = usePinnedWidgetsContext();

  useReelRaceLeaderboardModal(currentRace);

  const { t } = useTranslationsGql({
    reel_races_drawer_pts: `root:${CMS_SLUGS.MODAL_WAGERING}:fields.reel_races_drawer_pts`,
    reel_races_drawer_points: `root:${CMS_SLUGS.MODAL_WAGERING}:fields.reel_races_drawer_points`,
    reel_races_drawer_spins: `root:${CMS_SLUGS.MODAL_WAGERING}:fields.reel_races_drawer_spins`,
    reel_races_drawer_full_leaderboard: `root:${CMS_SLUGS.MODAL_WAGERING}:fields.reel_races_drawer_full_leaderboard`,
  });

  const gameProgress = useReelRaceProgress(currentRace, 1000);

  React.useEffect(() => {
    if (currentRace?.hasEnded && pinnedWidgets.includes(DRAWERS.REEL_RACES)) {
      togglePin(DRAWERS.REEL_RACES);
    }
  }, [currentRace, currentReelRaceFromHook, pinnedWidgets, togglePin]);

  const leaderboard = React.useMemo(() => {
    if (!currentRace) {
      return [];
    }

    if (currentRace.leaderboard.length <= TOTAL_LEADERBOARD_RESULTS) {
      return currentRace.leaderboard;
    }

    const leaderboardTopFixedItems = currentRace.leaderboard.slice(
      0,
      LEADERBOARD_FIXED - 1
    );
    const playerInTopFixed =
      currentRace.position - 1 - LEADERBOARD_SPAN <= LEADERBOARD_FIXED - 1;
    const leaderboardScrollableItems = currentRace.leaderboard.slice(
      playerInTopFixed
        ? LEADERBOARD_FIXED - 1
        : currentRace.position - 1 - LEADERBOARD_SPAN,
      currentRace.position + LEADERBOARD_SPAN
    );

    return [...leaderboardTopFixedItems, ...leaderboardScrollableItems];
  }, [currentRace]);

  if (!currentRace || !currentRace?.isInProgress) {
    return null;
  }

  const {
    remainingSpins,
    position,
    points,
    startTime,
    endTime,
    boosters,
  } = currentRace;

  const gameDuration = parseInt((endTime - startTime) / 1000 / 60, 10) || 0;

  return (
    <Flex direction="vertical" className={className}>
      <SidebarElementWrapper
        pinnable={isDesktop()}
        onPinClick={() => togglePin(DRAWERS.REEL_RACES)}
        className="o-flex__item--no-shrink"
      >
        <ReelRacesDrawerWidget
          t={t}
          spinsLeft={remainingSpins}
          position={position}
          points={points}
          boosters={boosters}
          gameProgress={gameProgress}
          gameDuration={gameDuration}
          showLeaderboardLink={!pinnedWidgets.includes(DRAWERS.REEL_RACES)}
          onShowLeaderboardClick={() => setShowLeaderboard(prev => !prev)}
          isLeaderboardOpen={showLeaderboard}
        />
      </SidebarElementWrapper>
      <Desktop>
        {showLeaderboard && (
          <SidebarElementWrapper
            className="u-margin-top"
            style={{
              flex: initialShowLeaderboard ? "1 1 auto" : null,
              height: initialShowLeaderboard ? 0 : "auto",
            }}
          >
            <ReelRaceLeaderboardResults
              className={cx(
                "t-border-r",
                initialShowLeaderboard ? "u-height--full" : "u-height--auto"
              )}
              size={leaderboard.length}
              leaderboard={leaderboard}
              playerId={playerId}
              forceLaurelPositions={LEADERBOARD_LAURELS}
              inverted
              fixedRows={LEADERBOARD_FIXED}
              scrollable={initialShowLeaderboard}
            />
          </SidebarElementWrapper>
        )}
      </Desktop>
    </Flex>
  );
};
