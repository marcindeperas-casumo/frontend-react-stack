import React from "react";
import LazyPortal from "Components/LazyPortal";

export const LazyPlayOkayGameTypeExclusions = props => (
  <LazyPortal
    hostElementId="react-host-game-type-exclusions"
    loader={() =>
      import(
        "Components/Compliance/Exclusions/GameTypeExclusions/GameTypeExclusionsCard"
      )
    }
    namedExport="GameTypeExclusionsCard"
    props={props}
  />
);
