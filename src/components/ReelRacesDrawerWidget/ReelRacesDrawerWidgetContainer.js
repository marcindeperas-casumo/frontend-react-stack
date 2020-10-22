// @flow
import React from "react";
import { useSelector } from "react-redux";
import { useTranslationsGql } from "Utils/hooks";
import { useReelRaceProgress } from "Utils/hooks/useReelRaceProgress";
import { playingSelector } from "Models/playing";
import { isNativeByUserAgent } from "Src/gameProviders/utils";
import { useReelRaceLeaderboardModal } from "Components/RSModal/Slots/ReelRaceLeaderboardModal/useReelRaceLeaderboardModal";
import { SidebarElementWrapper } from "Components/Sidebar/SidebarElementWrapper/SidebarElementWrapper";
import { playerIdSelector } from "Models/handshake/index";
import { Desktop, isDesktop } from "Components/ResponsiveLayout/index";
import { PinnedDrawersContext } from "Components/GamePage/Contexts/drawerPinningContext";
import { DRAWERS } from "Components/Sidebar/SidebarElementWrapper/constants";
import { CMS_SLUGS as CMS_SLUG } from "../../models/playing/playing.constants";
import { useCurrentReelRaceInfo } from "../../utils/hooks/useCurrentReelRaceInfo";
import { ReelRaceLeaderboardResults } from "../ReelRaceLeaderboard/ReelRaceLeaderboardResults";
import { ReelRacesDrawerWidget } from "./ReelRacesDrawerWidget";

type Props = {
  className?: string,
};

export const ReelRacesDrawerWidgetContainer = ({ className }: Props) => {
  const playing = useSelector(playingSelector);
  const playerId = useSelector(playerIdSelector);
  const currentReelRaceFromHook = useCurrentReelRaceInfo(playing?.gameId);
  const currentRace = isNativeByUserAgent() ? null : currentReelRaceFromHook;
  const [showLeaderboard, setShowLeaderboard] = React.useState(false);
  const { togglePin, isPinned } = React.useContext(PinnedDrawersContext);

  useReelRaceLeaderboardModal(currentRace);

  const { t } = useTranslationsGql({
    reel_races_drawer_pts: `root:${CMS_SLUG.MODAL_WAGERING}:fields.reel_races_drawer_pts`,
    reel_races_drawer_points: `root:${CMS_SLUG.MODAL_WAGERING}:fields.reel_races_drawer_points`,
    reel_races_drawer_spins: `root:${CMS_SLUG.MODAL_WAGERING}:fields.reel_races_drawer_spins`,
    reel_races_drawer_full_leaderboard: `root:${CMS_SLUG.MODAL_WAGERING}:fields.reel_races_drawer_full_leaderboard`,
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
        />
      </SidebarElementWrapper>
      <Desktop>
        {showLeaderboard && (
          <SidebarElementWrapper className="u-margin-top">
            <ReelRaceLeaderboardResults
              className="t-border-r--md"
              size={currentRace.leaderboard.length}
              leaderboard={currentRace.leaderboard}
              playerId={playerId}
              forceLaurelPositions={3}
              style={{ height: "390px" }}
              inverted
              fixedRows={3}
              scrollable
            />
          </SidebarElementWrapper>
        )}
      </Desktop>
    </div>
  );
};
