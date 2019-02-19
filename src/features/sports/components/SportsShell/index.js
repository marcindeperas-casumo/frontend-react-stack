import React from "react";
import Loadable from "react-loadable";
import SportsShellSkeleton from "./SportsShellSkeleton";

export default Loadable({
  loader: () => import("./SportsShellPortal"),
  loading: () => <SportsShellSkeleton />,
});
