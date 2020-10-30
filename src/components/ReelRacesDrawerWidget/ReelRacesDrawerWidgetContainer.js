// @flow
import * as React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
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

  const leaderboard = React.useMemo(() => {
    if (!currentRace) {
      return [];
    }

    return [
      ...currentRace.leaderboard.slice(0, LEADERBOARD_FIXED - 1),
      ...currentRace.leaderboard.slice(
        currentRace.position - 1 - LEADERBOARD_SPAN <= LEADERBOARD_FIXED - 1
          ? LEADERBOARD_FIXED - 1
          : currentRace.position - 1 - LEADERBOARD_SPAN,
        currentRace.position + LEADERBOARD_SPAN
      ),
    ];
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
          showLeaderboardLink
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
