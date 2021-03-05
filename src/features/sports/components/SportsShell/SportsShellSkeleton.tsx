import { SportsNavigationSkeleton } from "@casumo/sports-navigation";
import * as React from "react";
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
