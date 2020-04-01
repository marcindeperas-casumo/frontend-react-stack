import React from "react";
import SportsShellSkeleton from "Features/sports/components/SportsShell/SportsShellSkeleton";

const LazyComponent = React.lazy(() =>
  import("Features/sports/components/SportsLoS").then(module => ({
    default: module.SportsLoSContainer,
  }))
);

export const LazySportsLoS = props => (
  <React.Suspense fallback={<SportsShellSkeleton />}>
    <LazyComponent urlPrefix={props.urlPrefix} />
  </React.Suspense>
);
