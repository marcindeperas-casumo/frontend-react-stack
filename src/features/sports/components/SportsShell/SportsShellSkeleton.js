/* @flow */
import * as React from "react";
import { SportsNavigationSkeleton } from "@casumo/sports-navigation";
import SportsTopBarSkeleton from "Features/sports/components/SportsTopBar/SportsTopBarSkeleton";
import KambiClientSkeleton from "Features/sports/components/KambiClient/KambiClientSkeleton";

const SportsShellSkeleton = () => (
  <>
    <SportsTopBarSkeleton />
    <SportsNavigationSkeleton />
    <KambiClientSkeleton />
  </>
);

export default SportsShellSkeleton;
