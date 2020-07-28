import React from "react";
import LazyPortal from "Components/LazyPortal";

export const LazyCasinoGamesSlotsPage = props => (
  <LazyPortal
    hostElementId="react-host-rtp"
    loader={() => import("Components/CasinoGames/CasinoGamesSlots")}
    namedExport="CasinoGamesSlots"
  />
);
