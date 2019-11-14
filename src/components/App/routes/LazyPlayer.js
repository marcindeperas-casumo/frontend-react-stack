import React from "react";
import LazyPortal from "Components/LazyPortal";

export const LazyPlayer = props => (
  <>
    <LazyPortal
      hostElementId="react-host-adventure"
      loader={() => import("Components/AdventureCard")}
      namedExport="AdventureCard"
      {...props}
    />
    <LazyPortal
      hostElementId="react-host-adventure-valuables"
      loader={() => import("Components/PlayerValuableList")}
      namedExport="PlayerValuableListHorizontal"
      {...props}
    />
  </>
);
