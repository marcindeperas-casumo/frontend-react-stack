/* @flow */
import * as React from "react";
import SportsTopBarSkeleton from "Features/sports/components/SportsTopBar/SportsTopBarSkeleton";
import KambiClientSkeleton from "Features/sports/components/KambiClient/KambiClientSkeleton";
import { SportsNavSkeleton } from "Features/sports/components/SportsNav/SportsNavSkeleton";

const SportsShellSkeleton = () => (
  <>
    <SportsTopBarSkeleton />
    <SportsNavSkeleton />
    <KambiClientSkeleton />
  </>
);

export default SportsShellSkeleton;
