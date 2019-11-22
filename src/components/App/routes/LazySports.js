import React from "react";
import LazyPortal from "Components/LazyPortal";
import SportsShellSkeleton from "Features/sports/components/SportsShell/SportsShellSkeleton";

export const LazySports = React.memo(
  props => (
    <LazyPortal
      hostElementId="react-host-sports-shell"
      loader={() => import("Features/sports/components/SportsShell")}
      fallback={<SportsShellSkeleton />}
      namedExport="SportsShellContainer"
      props={props}
    />
  ),
  // Reach router will pass down the window.location which will cause a rerender every time the
  // Kambi client changes page as it uses hashes.  This Memo ensures it will only rerender when the URI changes
  (prevProps, nextProps) => {
    return prevProps.uri === nextProps.uri;
  }
);
