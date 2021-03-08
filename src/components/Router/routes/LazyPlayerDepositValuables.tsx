import React from "react";
import LazyPortal from "Components/LazyPortal";

export const LazyPlayerDepositValuables = props => (
  <LazyPortal
    hostElementId="react-host-deposit-valuables"
    loader={() => import("Components/PlayerDepositValuables")}
    namedExport="PlayerDepositValuables"
    props={props}
  />
);
