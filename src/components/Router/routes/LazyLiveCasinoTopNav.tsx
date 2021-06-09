import * as React from "react";
import LazyPortal from "Components/LazyPortal";

export const LazyLiveCasinoTopNav = (props: {
  basepath: string;
  path: string;
}) => (
  <LazyPortal
    hostElementId="react-host-top-nav"
    loader={() => import("Components/Router/LiveCasinoGames/LiveCasinoTopNav")}
    namedExport="LiveCasinoTopNav"
    props={props}
  />
);
