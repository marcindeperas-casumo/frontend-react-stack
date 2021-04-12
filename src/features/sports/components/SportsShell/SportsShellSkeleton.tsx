import { SportsNavigationSkeleton } from "@casumo/sports-navigation";
import * as React from "react";
import KambiClientSkeleton from "Features/sports/components/KambiClient/KambiClientSkeleton";

const SportsShellSkeleton = () => (
  <>
    <SportsNavigationSkeleton />
    <KambiClientSkeleton />
  </>
);

export default SportsShellSkeleton;
