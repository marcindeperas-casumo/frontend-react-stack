import React from "react";
import LazyPortal from "Components/LazyPortal";

export const LazyCasinoGamesRTPLight = props => (
  <LazyPortal
    hostElementId="react-host-rtp-light"
    loader={() => import("Components/CasinoGames/CasinoGamesRTPLight")}
    namedExport="CasinoGamesRTPLight"
  />
);
