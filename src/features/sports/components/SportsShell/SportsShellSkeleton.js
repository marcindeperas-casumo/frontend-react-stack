/* @flow */
import * as React from "react";

import KambiClientSkeleton from "Features/sports/components/KambiClient/KambiClientSkeleton";
import SportsNavSkeleton from "Features/sports/components/SportsNav/SportsNavSkeleton";

const SportsShellSkeleton = () => (
  <>
    <SportsNavSkeleton />
    <KambiClientSkeleton />
  </>
);

export default SportsShellSkeleton;
