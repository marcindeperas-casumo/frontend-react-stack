// @flow
import * as React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import { useSelector } from "react-redux";
import { useCurrentReelRaceInfo } from "Utils/hooks";
import { playingSelector } from "Models/playing";
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
  const { togglePin, pinnedWidgets } = usePinnedWidgetsContext();

  useReelRaceLeaderboardModal(currentRace);

  React.useEffect(() => {
    if (currentRace?.hasEnded && pinnedWidgets.includes(DRAWERS.REEL_RACES)) {
      togglePin(DRAWERS.REEL_RACES);
    }
  }, [currentRace, currentReelRaceFromHook, pinnedWidgets, togglePin]);

  if (!currentRace || !currentRace?.isInProgress) {
    return null;
  }

  return (
    <Flex direction="vertical" className={className}>
      <SidebarElementWrapper
        pinnable={isDesktop()}
        onPinClick={() => togglePin(DRAWERS.REEL_RACES)}
        className="o-flex__item--no-shrink"
      >
        <ReelRacesDrawerWidget
          currentRace={currentRace}
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
