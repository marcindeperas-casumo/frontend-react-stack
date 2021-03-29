import React from "react";
import { Desktop } from "Components/ResponsiveLayout";
import { ReelRacesDrawerWidgetContainer as ReelRacesDrawerWidget } from "Components/ReelRacesDrawerWidget/ReelRacesDrawerWidgetContainer";
import { usePinnedWidgetsContext } from "../Contexts";
import { DRAWERS } from "../../Sidebar/SidebarElementWrapper/constants";
import { useCurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";

import "./GamePageSidebar.scss";

export const GamePageSidebar = () => {
  const { pinnedWidgets } = usePinnedWidgetsContext();
  const currentRace = useCurrentReelRaceInfo();

  if (pinnedWidgets.includes(DRAWERS.REEL_RACES)) {
    return (
      <Desktop>
        <div className="c-game-page-sidebar u-padding-right u-height--full">
          <ReelRacesDrawerWidget
            initialShowLeaderboard
            className="u-height--full"
          />
        </div>
      </Desktop>
    );
  }

  return null;
};
