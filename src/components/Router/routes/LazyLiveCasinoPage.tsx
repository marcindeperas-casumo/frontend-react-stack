import React from "react";
import LazyPortal from "Components/LazyPortal";

export const LazyLiveCasinoPage = props => (
  <LazyPortal
    hostElementId="react-host-live-casino"
    loader={() => import("Components/Router/LiveCasinoGames")}
    namedExport="LiveCasinoGames"
    props={props}
  />
);
