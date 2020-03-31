import React from "react";
import LazyPortal from "Components/LazyPortal";
import SportsShellSkeleton from "Features/sports/components/SportsShell/SportsShellSkeleton";

export const LazySportsLoS = React.memo(
  props => (
    <LazyPortal
      hostElementId="sports-los-portal"
      loader={() => import("Features/sports/components/SportsLoS")}
      fallback={<SportsShellSkeleton />}
      namedExport="SportsLoSContainer"
      props={{ urlPrefix: props.urlPrefix }}
    />
  ),
  // Reach router will pass down the window.location which will cause a rerender every time the
  // Kambi client changes page as it uses hashes.  This Memo ensures it will only rerender when the URI changes
  (prevProps, nextProps) => prevProps.uri === nextProps.uri
);
