// @flow
import React from "react";
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
import { PinnedDrawersContext } from "Components/GamePage/Contexts/drawerPinningContext";
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

export const ReelRacesDrawerWidgetContainer = ({
  className,
  initialShowLeaderboard = false,
}: Props) => {
  const playing = useSelector(playingSelector);
  const playerId = useSelector(playerIdSelector);
  const currentReelRaceFromHook = useCurrentReelRaceInfo(playing?.gameId);
  const currentRace = isNativeByUserAgent() ? null : currentReelRaceFromHook;
  const [showLeaderboard, setShowLeaderboard] = React.useState(
    initialShowLeaderboard
  );
  const { togglePin, isPinned } = React.useContext(PinnedDrawersContext);

  useReelRaceLeaderboardModal(currentRace);

  const { t } = useTranslationsGql({
    reel_races_drawer_pts: `root:${CMS_SLUGS.MODAL_WAGERING}:fields.reel_races_drawer_pts`,
    reel_races_drawer_points: `root:${CMS_SLUGS.MODAL_WAGERING}:fields.reel_races_drawer_points`,
    reel_races_drawer_spins: `root:${CMS_SLUGS.MODAL_WAGERING}:fields.reel_races_drawer_spins`,
    reel_races_drawer_full_leaderboard: `root:${CMS_SLUGS.MODAL_WAGERING}:fields.reel_races_drawer_full_leaderboard`,
  });

  const gameProgress = useReelRaceProgress(currentRace, 1000);

  React.useEffect(() => {
    if (currentRace?.hasEnded && isPinned(DRAWERS.REEL_RACES)) {
      togglePin(DRAWERS.REEL_RACES);
    }
  }, [currentRace, currentReelRaceFromHook, isPinned, togglePin]);

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
  const leaderboardTopFixedItems = currentRace.leaderboard.slice(
    0,
    LEADERBOARD_FIXED - 1
  );
  const playerInTopFixed =
    position - 1 - LEADERBOARD_SPAN <= LEADERBOARD_FIXED - 1;
  const leaderboardScrollableItems = currentRace.leaderboard.slice(
    playerInTopFixed ? LEADERBOARD_FIXED - 1 : position - 1 - LEADERBOARD_SPAN,
    position + LEADERBOARD_SPAN
  );
  const leaderboard = [
    ...leaderboardTopFixedItems,
    ...leaderboardScrollableItems,
  ];

  return (
    <div className={className}>
      <SidebarElementWrapper
        pinnable={isDesktop()}
        onPinClick={() => togglePin(DRAWERS.REEL_RACES)}
      >
        <ReelRacesDrawerWidget
          t={t}
          spinsLeft={remainingSpins}
          position={position}
          points={points}
          boosters={boosters}
          gameProgress={gameProgress}
          gameDuration={gameDuration}
          showLeaderboardLink
          onShowLeaderboardClick={() => setShowLeaderboard(prev => !prev)}
          isLeaderboardOpen={showLeaderboard}
        />
      </SidebarElementWrapper>
      <Desktop>
        {showLeaderboard && (
          <SidebarElementWrapper className="u-margin-top">
            <ReelRaceLeaderboardResults
              className="t-border-r"
              size={leaderboard.length}
              leaderboard={leaderboard}
              playerId={playerId}
              forceLaurelPositions={LEADERBOARD_LAURELS}
              style={{ height: "390px" }}
              inverted
              fixedRows={LEADERBOARD_FIXED}
              scrollable
            />
          </SidebarElementWrapper>
        )}
      </Desktop>
    </div>
  );
};
