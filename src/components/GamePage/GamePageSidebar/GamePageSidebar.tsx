import React from "react";
import { Desktop } from "Components/ResponsiveLayout";
import { ReelRacesDrawerWidgetContainer as ReelRacesDrawerWidget } from "Components/ReelRacesDrawerWidget/ReelRacesDrawerWidgetContainer";

import "./GamePageSidebar.scss";

export const GamePageSidebar = () =>
  <Desktop>
    <div className="c-game-page-sidebar u-padding-right u-height--full">
      <ReelRacesDrawerWidget
        initialShowLeaderboard
        className="u-height--full"
      />
    </div>
  </Desktop>;
