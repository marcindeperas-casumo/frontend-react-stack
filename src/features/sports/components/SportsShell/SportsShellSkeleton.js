/* @flow */
import * as React from "react";
import SportsTopBarSkeleton from "Features/sports/components/SportsTopBar/SportsTopBarSkeleton";
import SportsNavSkeleton from "Features/sports/components/SportsNav/SportsNavSkeleton";
import KambiClientSkeleton from "Features/sports/components/KambiClient/KambiClientSkeleton";

const SportsShellSkeleton = () => (
  <>
    <SportsTopBarSkeleton />
    <SportsNavSkeleton />
    <KambiClientSkeleton />
  </>
);

export default SportsShellSkeleton;
