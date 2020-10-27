/* @flow */
import * as React from "react";
import SportsTopBarSkeleton from "Features/sports/components/SportsTopBar/SportsTopBarSkeleton";
import KambiClientSkeleton from "Features/sports/components/KambiClient/KambiClientSkeleton";
/* TODO: import sports-navigation skeleton from shared component */

const SportsShellSkeleton = () => (
  <>
    <SportsTopBarSkeleton />
    <KambiClientSkeleton />
  </>
);

export default SportsShellSkeleton;
