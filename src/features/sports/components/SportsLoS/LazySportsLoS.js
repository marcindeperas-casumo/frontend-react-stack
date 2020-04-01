import React from "react";
import SportsShellSkeleton from "Features/sports/components/SportsShell/SportsShellSkeleton";

const LazyComponent = React.lazy(() =>
  import("Features/sports/components/SportsLoS").then(module => ({
    default: module.SportsLoSContainer,
  }))
);

export const LazySportsLoS = React.memo(
  props => (
    <React.Suspense fallback={<SportsShellSkeleton />}>
      <LazyComponent urlPrefix={props.urlPrefix} />
    </React.Suspense>
  ),
  // Reach router will pass down the window.location which will cause
  // a rerender every time the Kambi client changes page as it uses hashes.
  // This Memo ensures it will only rerender when the URI changes
  (prevProps, nextProps) => prevProps.uri === nextProps.uri
);
