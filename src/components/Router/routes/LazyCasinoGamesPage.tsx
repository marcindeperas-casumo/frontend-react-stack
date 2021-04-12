import React from "react";
import LazyPortal from "Components/LazyPortal";

export const LazyCasinoGamesPage = props => (
  <LazyPortal
    hostElementId="react-host-rtp"
    loader={() => import("Components/CasinoGames")}
    namedExport="CasinoGames"
  />
);
