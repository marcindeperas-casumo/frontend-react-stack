import * as React from "react";
import LazyPortal from "Components/LazyPortal";

export const LazyTopNav = (props: { basepath: string }) => (
  <LazyPortal
    hostElementId="react-host-top-nav"
    loader={() => import("Components/Router/GameBrowser/TopNav")}
    namedExport="TopNav"
    props={props}
  />
);
